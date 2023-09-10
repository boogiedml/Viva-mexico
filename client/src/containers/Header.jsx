import React from "react";

const Header = () => {
  return (
    <div className="w-full container mx-auto px-5 md:px-0 lg:px-8 pt-5 pb-8 text-center">
      <h1 className="relative w-fit mx-auto text-myBrown text-2xl md:text-3xl lg:text-4xl font-grotesk font-[500] uppercase leading-[1.3] after:w-2 after:h-2 lg:after:w-3 lg:after:h-3 after:rounded-full after:bg-[#CB9247] after:absolute after:bottom-2 after:-right-3 lg:after:-right-4">
        VIVA MEXICO
      </h1>
      <p className="tracking-[1px] mt-3 ffont-openSans text-myGold text-xs md:text-sm lg:text-base font-[400] italic">
        ...a thrilling experience
      </p>
      <p className="tracking-[1px] mt-3 font-nunito text-myBrown text-xs md:text-sm lg:text-base font-[500]">
        E MENU
      </p>
    </div>
  );
};

export default Header;
