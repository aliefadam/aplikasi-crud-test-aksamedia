import React from "react";

function FormSelect({ options = [], label, onChange, selected }) {
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
        <div className="w-full border-2 p-2 flex items-center gap-1 border-primary rounded-lg dark:bg-gray-500 dark:placeholder:text-white dark:text-white dark:border-white">
          <i className="fa-regular fa-graduation-cap ms-1"></i>
          <select
            className="w-full outline-none dark:bg-gray-500 dark:placeholder:text-white dark:text-white dark:border-white"
            onChange={onChange}
            defaultValue={selected}
          >
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
