import React, { useEffect, useState } from "react";
import { Footer, Navbar } from "../containers";
import { Button, ProductCard } from "../components";
import { BiCategoryAlt, BiFoodTag } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { HashLoader } from "react-spinners";
import Cookies from "js-cookie";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const token = Cookies.get("__trt_privé");

  useEffect(() => {
    const fetchCat = async () => {
      try {
        const response = await axios.get("/category");
        setCategories(response?.data?.categoryList);
        // console.log(response?.data?.categoryList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchPro = async () => {
      try {
        setIsLoadingProducts(true);
        const response = await axios.get("/product");
        // console.log(response?.data?.productList);
        setProducts(response?.data?.productList);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoadingProducts(false);
      }
    };

    fetchCat();
    fetchPro();
  }, []);

  const deleteProduct = async (productId) => {
    const config = {
      headers: {
        token: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.delete(`/product/${productId}`, config);
      // If successful, update the product list
      if (response?.status === 204) {
        setProducts((prevProducts) =>
          prevProducts.filter((p) => p._id !== productId)
        );
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="flex flex-col relative min-h-screen">
      <Navbar />
      <section className="flex-grow w-full container mx-auto px-5 md:px-0 lg:px-8 pt-14">
        <h1 className="relative w-fit mx-auto text-myBrown text-xl md:text-2xl lg:text-3xl font-grotesk font-[500] uppercase leading-[1.3] after:w-1 after:h-1 lg:after:w-2 lg:after:h-2 after:rounded-full after:bg-myGold after:absolute after:bottom-2 after:-right-2 lg:after:-right-3">
          Viva Mexico
        </h1>
        <div className="mt-4">
          <h3 className="text-base lg:text-xl font-[500] font-nunito text-myGold">
            Dashboard
          </h3>
        </div>
        <div className="products_display my-10">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base lg:text-lg font-grotesk text-myBrown">
              Categories
            </h3>
            <Button
              label={
                <span className="flex items-center gap-2">
                  <BiCategoryAlt /> Add category
                </span>
              }
              onClick={() => navigate("/admin/add_category")}
            />
          </div>
          <ul className="categories flex items-center gap-3 capitalize overflow-scroll">
            {categories.map((c) => (
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "tween", duration: 1 }}
                className="w-fit max-w-[120px] cursor-pointer"
                key={c._id}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mx-auto bg-myGold rounded-full border-myGold border-4">
                  <img
                    src={c.image}
                    alt=""
                    className="w-full h-full object-cover bg-center rounded-full"
                  />
                </div>
                <p className="mt-2 text-center text-xs font-[500] uppercase line-clamp-2">
                  {c.name}
                </p>
              </motion.div>
            ))}
          </ul>
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base lg:text-lg font-grotesk text-myBrown">
                Products
              </h3>
              <Button
                label={
                  <span className="flex items-center gap-2">
                    <BiFoodTag /> Add product
                  </span>
                }
                onClick={() => navigate("/admin/add_product")}
              />
            </div>
            <div>
              {isLoadingProducts ? (
                <div className="w-full min-h-[400px] md:min-h-[250px] flex justify-center items-center">
                  <HashLoader size={50} color="#040D12" />
                </div>
              ) : (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4">
                  {products.map((p) => (
                    <ProductCard
                      key={p._id}
                      admin={true}
                      productDetails={p}
                      onDelete={deleteProduct}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
