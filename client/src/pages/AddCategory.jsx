import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Footer, Navbar } from "../containers";
import { Button, Input } from "../components";
import { BiCategoryAlt } from "react-icons/bi";
import axios from "../../api/axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { BsImage } from "react-icons/bs";

const AddCategory = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useRef(null);
  const token = Cookies.get("__v_i_va");
  const showError = ({ msgContent }) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: msgContent,
      life: 3000,
    });
  };

  const [selectedCategoryType, setSelectedCategoryType] = useState("");

  const categoryFormik = useFormik({
    initialValues: {
      name: "",
      categoryType: "",
      image: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Category name is required"),
      categoryType: Yup.string().required("Category type is required"),
      image: Yup.string().required("Category image is required"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      values.categoryType = selectedCategoryType;
      const url = "/category";
      const config = {
        headers: {
          token: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      try {
        const { data } = await axios.post(url, values, config);
        if (!data.error) {
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

  const handleCategoryTypeChange = (type) => {
    setSelectedCategoryType(type);
    categoryFormik.setFieldValue("categoryType", type); // Update the formik field value
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-grow w-full container mx-auto px-5 md:px-0 lg:px-8 flex items-center justify-center">
        <div className="w-[100%] sm:w-[90%] md:w-[500px]">
          <div className="mt-4 bg-myGold bg-opacity-40 p-4 rounded-xl">
            <h3 className="text-base lg:text-lg font-grotesk mb-3 text-myBrown">
              Add Category
            </h3>
            <form onSubmit={categoryFormik.handleSubmit}>
              <Input
                label="Category name"
                name="name"
                placeholder="Ex. Drinks"
                icon={<BiCategoryAlt />}
                onChange={categoryFormik.handleChange}
                defaultValue={categoryFormik.values.name}
                onBlur={categoryFormik.handleBlur}
              />
              <Input
                label="Category background"
                name="image"
                type="file"
                icon={<BsImage />}
                fileFormik={categoryFormik}
              />
              <div className="categoryType flex flex-col md:flex-row md:items-center justify-between mb-3">
                <div className="mt-2  flex items-center gap-4 cursor-pointer">
                  <span
                    className={`relative p-2 pl-10 rounded-full border-[1px] border-gray-200 text-sm font-nunito ${
                      selectedCategoryType === "Meal"
                        ? "bg-myBrown text-white"
                        : "text-myBrown bg-white"
                    }`}
                    onClick={() => handleCategoryTypeChange("Meal")}
                  >
                    <span className="absolute left-1.5 top-1.5 p-1 bg-myGold bg-opacity-40 rounded-full border-[1px] border-gray-200">
                      <BiCategoryAlt color="#000" />
                    </span>
                    Meal
                  </span>
                </div>
                <div className="mt-2  flex items-center gap-4 cursor-pointer">
                  <span
                    className={`relative p-2 pl-10 rounded-full border-[1px] border-gray-200 text-sm font-nunito ${
                      selectedCategoryType === "Drink"
                        ? "bg-myBrown text-white"
                        : "text-myBrown bg-white"
                    }`}
                    onClick={() => handleCategoryTypeChange("Drink")}
                  >
                    <span className="absolute left-1.5 top-1.5 p-1 bg-myGold bg-opacity-40 rounded-full border-[1px] border-gray-200">
                      <BiCategoryAlt color="#000" />
                    </span>
                    Drink
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-4 cursor-pointer">
                  <span
                    className={`relative p-2 pl-10 rounded-full border-[1px] border-gray-200 text-sm font-nunito ${
                      selectedCategoryType === "Other"
                        ? "bg-myBrown text-white"
                        : "text-myBrown bg-white"
                    }`}
                    onClick={() => handleCategoryTypeChange("Other")}
                  >
                    <span className="absolute left-1.5 top-1.5 p-1 bg-myGold bg-opacity-40 rounded-full border-[1px] border-gray-200">
                      <BiCategoryAlt color="#000" />
                    </span>
                    Other
                  </span>
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  label={isLoading ? "Please wait..." : "Create category"}
                  type="submit"
                  color="bg-[#040D12] text-white"
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

export default AddCategory;
