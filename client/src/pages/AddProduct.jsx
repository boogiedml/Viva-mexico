import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Footer, Navbar } from "../containers";
import { Button, Input, Select } from "../components";
import { BiCategoryAlt, BiFoodTag } from "react-icons/bi";
import { GiPriceTag } from "react-icons/gi";
import { BsImage } from "react-icons/bs";
import axios from "../../api/axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";

const AddProduct = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
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

  useEffect(() => {
    const fetchCat = async () => {
      try {
        const response = await axios.get("/category");
        setCategories(response?.data?.categoryList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCat();
  }, []);

  const productFormik = useFormik({
    initialValues: {
      name: "",
      desc: "",
      price: "",
      category: "",
      image: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Product name is required"),
      desc: Yup.string(),
      price: Yup.string().required("Product price is required"),
      category: Yup.string().required("Category is required"),
      image: Yup.string().required("Product image is required"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      const url = "/product";
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-grow w-full container mx-auto px-5 md:px-0 lg:px-8 flex items-center justify-center">
        <div className="w-[100%] sm:w-[90%] md:w-[500px]">
          <div className="mt-4 bg-myGold bg-opacity-40 p-4 rounded-xl">
            <h3 className="text-base lg:text-lg font-grotesk mb-3">
              Add Product
            </h3>
            <form onSubmit={productFormik.handleSubmit}>
              <Input
                label="Product Name"
                name="name"
                placeholder="Ex. Coke"
                icon={<BiFoodTag />}
                onChange={productFormik.handleChange}
                defaultValue={productFormik.values.name}
                onBlur={productFormik.handleBlur}
              />
              <Input
                label="Description"
                name="desc"
                placeholder="Ex. Cocacola"
                icon={<BiFoodTag />}
                onChange={productFormik.handleChange}
                defaultValue={productFormik.values.desc}
                onBlur={productFormik.handleBlur}
              />
              <Select
                label="Category"
                option={categories}
                name="category"
                icon={<BiCategoryAlt />}
                onChange={productFormik.handleChange}
                defaultValue={productFormik.values.category}
                onBlur={productFormik.handleBlur}
              />
              <Input
                label="Price"
                name="price"
                placeholder="Ex. 500"
                icon={<GiPriceTag />}
                onChange={productFormik.handleChange}
                defaultValue={productFormik.values.price}
                onBlur={productFormik.handleBlur}
              />
              <Input
                label="Product Image"
                name="image"
                type="file"
                icon={<BsImage />}
                fileFormik={productFormik}
              />
              <div className="flex justify-end mt-5">
                <Button
                  label={isLoading ? "Please wait..." : "Create product"}
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

export default AddProduct;