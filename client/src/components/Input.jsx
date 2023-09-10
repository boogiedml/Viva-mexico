import React, { useRef, useState } from "react";

const Input = ({
  label,
  type,
  name,
  placeholder,
  icon,
  onChange,
  defaultValue,
  onBlur,
  fileFormik,
}) => {
  const fileInputRef = useRef(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      fileFormik.setFieldValue("image", file);
      setSelectedFileName(file.name);
    } else {
      setSelectedFileName("");
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="mb-3">
      <label className="block text-sm text-myGold font-nunito" htmlFor={name}>
        {label}
      </label>
      <div className="relative">
        {type === "file" ? (
          <>
            <input
              ref={fileInputRef}
              className="hidden"
              name={name}
              id={name}
              type="file"
              onChange={handleFileChange}
            />
            <button
              className="w-full h-10 mt-2 py-2 px-4 bg-gray-50 border-[1px] border-gray-200 rounded-full text-left"
              onClick={handleFileButtonClick}
              type="button"
            >
              <span className="absolute left-2.5 top-4 p-1 bg-myGold bg-opacity-40 rounded-full border-[1px] border-gray-200">
                {icon}
              </span>
              <span className="absolute left-12 top-4 text-zinc-800 font-nunito font-[500] overflow-hidden whitespace-nowrap max-w-[80%]">
                <span className="truncate">
                  {selectedFileName || "Choose File"}
                </span>
              </span>
            </button>
          </>
        ) : (
          <>
            <input
              className="w-full mt-2 py-2 px-4 pl-12 bg-gray-50 border-[1px] border-gray-200 rounded-full outline-none"
              name={name}
              id={name}
              type={type ? type : "text"}
              placeholder={placeholder}
              onChange={onChange}
              defaultValue={defaultValue}
              onBlur={onBlur}
            />
            <span className="absolute left-2.5 top-4 p-1 bg-myGold bg-opacity-40 rounded-full border-[1px] border-gray-200">
              {icon}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default Input;
