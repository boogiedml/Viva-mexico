import React from "react";

const Button = ({ label, type, onClick, active }) => {
  return (
    <button
      type={type ? type : "button"}
      onClick={onClick}
      className={`py-2 px-8 rounded text-sm lg:text-[15px] bg-myBrown ${
        active ? "bg-opacity-40 text-myBrown" : "text-white"
      }  hover:-translate-y-0.5 transition-all duration-300`}
    >
      {label}
    </button>
  );
};

export default Button;
