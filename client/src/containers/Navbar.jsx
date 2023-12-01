import React, { useState } from "react";
import logo from "../assets/viva.png";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Hamburger, NavbarMenu } from "../components";
import Cookies from "js-cookie";
import { AnimatePresence } from "framer-motion";

const Navbar = ({ hamburgerColor }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isNavMenuOpened, setIsNavMenuOpened] = useState(false);

  const handleLogout = () => {
    Cookies.remove("__v_i_va");
    Cookies.remove("__thrillin_g__experience");
    navigate("/"); 
  };

  return (
    <>
      <nav className="flex items-center justify-between py-5 md:py-8 px-5 md:px-16 lg:px-20">
        <div className="w-14 md:w-16 lg:w-20 cursor-pointer relative z-[150]">
          <img src={logo} alt="logo" className="w-full" />
        </div>
        {location.pathname.startsWith("/admin") ? (
          <Button label="Sign Out" type="button" onClick={handleLogout} />
        ) : (
          <Hamburger
            color={hamburgerColor}
            isNavMenuOpened={isNavMenuOpened}
            setIsNavMenuOpened={setIsNavMenuOpened}
          />
        )}
      </nav>
      <AnimatePresence>
        {isNavMenuOpened && <NavbarMenu setMenuOpen={setIsNavMenuOpened} />}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
