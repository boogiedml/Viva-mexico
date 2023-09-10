import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { motion } from "framer-motion";
import Modal from "./Modal";

const ProductCard = ({ admin, productDetails, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const handleDelete = () => {
    onDelete(productDetails._id);
  };

  const handleImageClick = () => {
    setModalImage(productDetails?.image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "tween", duration: 0.5 }}
      className="bg-myGold bg-opacity-40 p-2 md:p-3 rounded-lg flex flex-col gap-3"
    >
      <div className="w-full h-40 md:h-44 relative">
        {admin && (
          <span className="absolute w-full h-full bg-black bg-opacity-30 rounded-lg"></span>
        )}
        <img
          className="rounded-lg w-full h-full object-cover object-center cursor-pointer"
          src={productDetails?.image}
          alt="product"
          onClick={handleImageClick}
        />
        {admin && (
          <Link to={`/admin/edit_product/${productDetails._id}`}>
            <span className="absolute right-3 top-3 z-10 p-2 rounded-md cursor-pointer bg-[#040D12] text-white text-sm hover:translate-y-1 transition-all duration-300">
              <FiEdit2 />
            </span>
          </Link>
        )}
        {admin && (
          <span
            className="absolute right-3 bottom-3 z-10 p-2 rounded-md cursor-pointer bg-[#040D12] text-white text-sm hover:-translate-y-1 transition-all duration-300"
            onClick={handleDelete}
          >
            <AiOutlineDelete />
          </span>
        )}
      </div>

      <div>
        <p className="text-sm md:text-base font-[500] text-gray-700 font-grotesk line-clamp-2 mb-2">
          {productDetails?.name}
        </p>
        <p className="text-xs md:text-sm font-[500] text-gray-700 font-grotesk line-clamp-2 mb-2">
          {productDetails?.desc}{" "}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm md:text-base text-zinc-500 font-[600] font-grotesk">
            ₦ {productDetails?.price}
          </span>
        </div>
      </div>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <img src={modalImage} alt="product" />
        </Modal>
      )}
    </motion.div>
  );
};

export default ProductCard;
