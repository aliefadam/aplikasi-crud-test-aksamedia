import React from "react";

function FormSelect({ options = [], label, onChange, value, className }) {
  return (
    <div className="">
      {label !== "" && (
        <label
          htmlFor={label}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}
      <div className="relative w-full">
        <div className="w-full border-2 p-2 flex items-center gap-1 border-primary rounded-lg">
          <i className="fa-regular fa-graduation-cap ms-1"></i>
          <select className="w-full outline-none" onChange={onChange}>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default FormSelect;
