import React, { useEffect, useState } from "react";
import { Footer, Header, MenuButtons, Navbar } from "../containers";
import { ProductCard, SearchBox } from "../components";
import axios from "../../api/axios";
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion";

const OtherDisplay = () => {
  const [isActiveCategory, setIsActiveCategory] = useState("All");
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCat = async () => {
      try {
        const response = await axios.get("/category");
        const othersCategories = response?.data?.categoryList.filter(
          (c) => c.categoryType === "Other"
        );
        setCategories(othersCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchPro = async () => {
      try {
        setIsLoadingProducts(true);
        const response = await axios.get("/product");
        const mealProduct = response?.data?.productList.filter(
          (p) => p?.category?.categoryType === "Other"
        );
        setProducts(mealProduct);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoadingProducts(false);
      }
    };

    fetchCat();
    fetchPro();
  }, []);

  const searchedProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAndSearchedProducts = searchedProducts.filter((p) =>
    isActiveCategory === "All" ? true : p?.category.name === isActiveCategory
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Header />
      <section className="w-full container mx-auto px-5 md:px-0 lg:px-8 mb-10 flex-grow">
        <MenuButtons />
        <div className="w-full mt-3">
          <SearchBox setSearchQuery={setSearchQuery} />
        </div>
        <div className="products_display">
          <div className="categories my-5 flex gap-5 overflow-scroll">
            {categories.map((c) => (
              <motion.div
                key={c._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: "tween", duration: 1.5 }}
                className="w-fit max-w-[120px] cursor-pointer"
                onClick={() => setIsActiveCategory(c.name)}
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
          </div>
          <h3 className="text-base lg:text-lg font-grotesk mb-3 mt-8 uppercase text-myBrown">
            {isActiveCategory}
          </h3>
          {isLoadingProducts ? (
            <div className="w-full flex-grow flex justify-center items-center">
              <ClipLoader size={30} color="#040D12" />
            </div>
          ) : filteredAndSearchedProducts.length === 0 ? (
            <div className="w-full flex-grow flex justify-center items-center text-center text-myBrown font-grotesk mt-4">
              No matching product found.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
              {filteredAndSearchedProducts.map((p) => (
                <ProductCard key={p._id} productDetails={p} />
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default OtherDisplay;
