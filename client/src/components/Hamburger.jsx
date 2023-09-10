import React from "react";

const Hamburger = ({ color, isNavMenuOpened, setIsNavMenuOpened }) => {
  return (
    <div
      onClick={() => setIsNavMenuOpened(!isNavMenuOpened)}
      className={`w-10 h-3.5 cursor-pointer z-[150] ${
        isNavMenuOpened
          ? "opened fixed top-[2.5rem] right-5 sm:right-10 md:top-[3.5rem] lg:top-[3.7rem] md:right-16 lg:right-20"
          : "relative"
      }`}
    >
      <span
        className={`bar bar1 ${
          isNavMenuOpened
            ? "bg-myBrown"
            : color && !isNavMenuOpened
            ? color
            : "bg-myBrown"
        }`}
      ></span>
      <span className="bar bar-space"></span>
      <span
        className={`bar bar2 ${
          isNavMenuOpened
            ? "bg-myBrown"
            : color && !isNavMenuOpened
            ? color
            : "bg-myBrown"
        }`}
      ></span>
    </div>
  );
};

export default Hamburger;
