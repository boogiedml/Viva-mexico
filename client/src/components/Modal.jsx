import React from "react";
import ReactDOM from "react-dom";
import { FiX } from "react-icons/fi";
import { motion } from "framer-motion";

const Modal = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button
        className="absolute top-2 right-2 z-20 text-red-700 transition-all duration-300 hover:text-gray-700"
        onClick={onClose}
      >
        <FiX size={40} />
      </button>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "tween", duration: .5 }}
        className="bg-white relative z-[100000000] p-4 rounded-lg shadow-lg w-full max-w-md"
      >
        <div className="p-4">{children}</div>
      </motion.div>
      <div
        className="fixed inset-0 bg-black opacity-25"
        onClick={onClose}
      ></div>
    </div>,
    document.getElementById("modal-root") // Make sure to have a <div id="modal-root"></div> in your HTML
  );
};

export default Modal;
