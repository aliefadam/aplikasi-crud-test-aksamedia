import React from "react";

function MyButton({ type, className, onClick, text, icon }) {
  return (
    <button
      type={type}
      className={`text-white focus:outline-none font-medium rounded-full text-sm px-5 py-3 flex justify-center items-center gap-2 text-center ${className}`}
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  );
}

export default MyButton;
