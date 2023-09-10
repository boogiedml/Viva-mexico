import React, { useState } from "react";
import { RiSearch2Line } from "react-icons/ri";

const SearchBox = ({ setSearchQuery }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    const newInputValue = event.target.value;
    setInputValue(newInputValue);
    setSearchQuery(newInputValue);
  };

  return (
    <div className="max-w-lg mx-auto relative">
      <input
        type="text"
        className="w-full py-2 md:py-3 px-6 pr-10 text-base font-nunito outline-none bg-myGold bg-opacity-40 rounded-full text-myBrown placeholder:text-myBrown"
        placeholder="Search"
        value={inputValue}
        onChange={handleInputChange}
      />
      <RiSearch2Line className="absolute text-base md:text-lg right-3 top-3 md:top-4" />
    </div>
  );
};

export default SearchBox;
