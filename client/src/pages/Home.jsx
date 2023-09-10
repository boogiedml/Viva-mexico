import React, { useState, useRef } from "react";
import { RiCloseLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "../containers";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const handleMenuClick = () => {
    setIsMenuOpen(true);
  };

  const handleMenuOptionClick = (menuOption) => {
    navigate(`/${menuOption}`);
  };

  return (
    <div className="bg-myBrown text-white w-full min-h-screen flex flex-col">
      <Navbar hamburgerColor="#FFF" />
      <section className="flex-grow flex items-center justify-center z-10">
        <button
          type="button"
          onClick={handleMenuClick}
          className="py-2 px-8 mb-28 rounded text-sm lg:text-[15px] bg-white text-myBrown hover:-translate-y-0.5 transition-all duration-300"
        >
          Menu
        </button>
      </section>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ type: "tween", duration: 0.3 }}
            className="overlay absolute bg-black bg-opacity-50 w-full h-full flex items-center justify-center z-[150]"
            ref={menuRef}
          >
            <div className="bg-white w-[95%] md:w-[500px] lg:w-[700px] text-black rounded-lg px-2 md:px-4 pb-4 pt-16 flex flex-col gap-2 relative">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-2 right-2 bg-myGold rounded-full p-2"
              >
                <RiCloseLine color="#FFF" className="text-lg" />
              </button>
              <button
                className="bg-gray-100 hover:bg-gray-200 text-base font-grotesk font-[500] transition-all duration-300 rounded-lg p-2 md:p-3"
                onClick={() => handleMenuOptionClick("meals")}
              >
                Food Menu
              </button>
              <button
                className="bg-gray-100 hover:bg-gray-200 text-base font-grotesk font-[500] transition-all duration-300 rounded-lg p-2 md:p-3"
                onClick={() => handleMenuOptionClick("drinks")}
              >
                Drinks Menu
              </button>
              <button
                className="bg-gray-100 hover:bg-gray-200 text-base font-grotesk font-[500] transition-all duration-300 rounded-lg p-2 md:p-3"
                onClick={() => handleMenuOptionClick("others")}
              >
                Others
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
