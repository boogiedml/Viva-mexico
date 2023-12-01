import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Footer, Navbar } from "../containers";
import { Button, Input } from "../components";
import { AiOutlineUser } from "react-icons/ai";
import { MdPassword } from "react-icons/md";
import axios from "../../api/axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";

const Signin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useRef(null);
  const showError = ({ msgContent }) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: msgContent,
      life: 3000,
    });
  };

  const signinFormik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      const url = "/user/login";
      try {
        const { data } = await axios.post(url, values);
        if (!data.error) {
          const { token, userId } = data.data;
          Cookies.set("__v_i_va", token);
          Cookies.set("__thrillin_g__experience", userId);

          navigate("/admin");
        }
      } catch (err) {
        const errorMessage =
          err.message === "Network Error"
            ? err.message
            : err?.response?.data?.message;
        showError({ msgContent: errorMessage });
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <section className="w-full flex-grow container mx-auto px-5 md:px-0 lg:px-8 flex items-center justify-center">
        <div className="w-[100%] sm:w-[90%] md:w-[500px]">
          <h1 className="relative w-fit mx-auto text-myBrown text-xl md:text-2xl lg:text-3xl font-grotesk font-[500] uppercase leading-[1.3] after:w-1 after:h-1 lg:after:w-2 lg:after:h-2 after:rounded-full after:bg-myGold after:absolute after:bottom-2 after:-right-2 lg:after:-right-3">
            VIVA MEXICO
          </h1>
          <div className="mt-4 bg-myGold bg-opacity-40 p-4 rounded-xl">
            <h3 className="text-base lg:text-lg font-grotesk mb-3 text-myBrown">
              Sign In
            </h3>
            <form onSubmit={signinFormik.handleSubmit}>
              <Input
                label="Username"
                name="username"
                icon={<AiOutlineUser />}
                onChange={signinFormik.handleChange}
                defaultValue={signinFormik.values.username}
                onBlur={signinFormik.handleBlur}
              />
              <Input
                label="Password"
                type="password"
                name="password"
                icon={<MdPassword />}
                onChange={signinFormik.handleChange}
                defaultValue={signinFormik.values.password}
                onBlur={signinFormik.handleBlur}
              />
              <div className="flex justify-end">
                <Button
                  label={isLoading ? "Please wait..." : "Authenticate"}
                  type="submit"
                />
              </div>
            </form>
          </div>
        </div>
      </section> 
      <Footer />
      <Toast ref={toast} />
    </div>
  );
};

export default Signin;
