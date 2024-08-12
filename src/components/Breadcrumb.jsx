import React from "react";
import { Link } from "react-router-dom";

function Breadcrumb({ items }) {
  const renderItems = () => {
    if (items.length === 0) {
      return (
        <span className="text-gray-700 flex gap-2 items-center">
          <i className="fa-regular fa-house"></i> Beranda
        </span>
      );
    } else {
      const el = items.map((item, index) => (
        <span key={index} className="text-gray-700 flex items-center">
          <i className="fa-regular fa-chevron-right mx-2 text-sm text-gray-500"></i>
          {item}
        </span>
      ));

      return (
        <>
          <Link
            to={"/"}
            className="text-primary hover:underline poppins-medium flex gap-2 items-center"
          >
            <i className="fa-regular fa-house"></i> Beranda
          </Link>
          {el}
        </>
      );
    }
  };

  return (
    <div className="text-sm flex">
      {renderItems()}
      {/* <i className="fa-regular fa-chevron-right mx-2 text-sm text-gray-500"></i> */}
    </div>
  );
}

export default Breadcrumb;
