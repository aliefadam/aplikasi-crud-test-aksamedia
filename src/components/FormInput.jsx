import React from "react";

function FormInput({ type, placeholder, label, icon, onChange }) {
  return (
    <div className="mb-5">
      <label
        htmlFor={label}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          {icon}
        </div>
        <input
          type={type}
          id={label}
          onChange={onChange}
          className="bg-gray-50 text-primary text-sm rounded-lg border-2 focus:shadow-md border-primary block w-full ps-10 p-2.5"
          placeholder={placeholder}
          required={true}
        />
      </div>
    </div>
  );
}

export default FormInput;
