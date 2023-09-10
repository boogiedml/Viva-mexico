import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components";

const MenuButtons = () => {
  const navigate = useNavigate();
  const location = useLocation()
  return (
    <div className="w-fit flex gap-4 mx-auto">
      <Button active={location.pathname === "/meals"} label="Meals" onClick={() => navigate("/meals")} />
      <Button active={location.pathname === "/drinks"} label="Drinks" onClick={() => navigate("/drinks")} />
      <Button active={location.pathname === "/others"} label="Others" onClick={() => navigate("/others")} />
    </div>
  );
};

export default MenuButtons;
