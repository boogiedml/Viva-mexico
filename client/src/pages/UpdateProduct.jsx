import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Footer, Navbar } from "../containers";
import { Button, Input } from "../components";
import { BiFoodTag } from "react-icons/bi";
import { GiPriceTag } from "react-icons/gi";
import { BsImage } from "react-icons/bs";
import axios from "../../api/axios";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { Toast } from "primereact/toast";

const UpdateProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const toast = useRef(null);
  const token = Cookies.get("__mo_naco");
  const showError = ({ msgContent }) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: msgContent,
      life: 3000,
    });
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`/product/${productId}`);
        const { product } = response?.data;
        // console.log(product);
        setProductDetails(product);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const productUpdateFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: productDetails?.name || "",
      desc: productDetails?.desc || "",
      price: productDetails?.price || "",
      category: productDetails?.category._id || "",
      image: productDetails?.image || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Product name is required"),
      desc: Yup.string(),
      price: Yup.string().required("Product price is required"),
      image: Yup.string(),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      const url = `/product/${productId}`;
      const config = {
        headers: {
          token: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      try {
        const { data } = await axios.put(url, values, config);
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
          <div className="mt-4 bg-gray-100 p-4 rounded-xl">
            <h3 className="text-base lg:text-lg font-grotesk mb-3">
              Update Product
            </h3>
            <form onSubmit={productUpdateFormik.handleSubmit}>
              <Input
                label="Product Name"
                name="name"
                placeholder="Ex. Coke"
                icon={<BiFoodTag />}
                onChange={productUpdateFormik.handleChange}
                defaultValue={productUpdateFormik.values.name}
                onBlur={productUpdateFormik.handleBlur}
              />
              <Input
                label="Description"
                name="desc"
                placeholder="Ex. Cocacola"
                icon={<BiFoodTag />}
                onChange={productUpdateFormik.handleChange}
                defaultValue={productUpdateFormik.values.desc}
                onBlur={productUpdateFormik.handleBlur}
              />
              <Input
                label="Price"
                name="price"
                placeholder="Ex. 500"
                icon={<GiPriceTag />}
                onChange={productUpdateFormik.handleChange}
                defaultValue={productUpdateFormik.values.price}
                onBlur={productUpdateFormik.handleBlur}
              />
              <Input
                label="Product Image"
                name="image"
                type="file"
                icon={<BsImage />}
                fileFormik={productUpdateFormik}
              />
              <div className="flex justify-end">
                <Button
                  label={isLoading ? "Please wait..." : "Update product"}
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

export default UpdateProduct;
