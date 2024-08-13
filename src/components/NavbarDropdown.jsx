import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Utils from "../utils/Utils.js";

function NavbarDropdown() {
  const navigate = useNavigate();
  const logout = () => {
    Utils.removeFromLocalStorage("login");
    navigate("/login");
  };

  return (
    <div className="absolute bg-white w-[200px] -bottom-[100px] right-0 shadow-md rounded-md overflow-hidden dark:bg-gray-800">
      <Link
        to={"/pengaturan"}
        className="flex p-3 hover:bg-gray-200 duration-200 cursor-pointer border-b-2 dark:hover:bg-gray-900"
      >
        <span className="text-primary text-sm flex items-center gap-2 dark:text-white">
          <i className="fa-regular fa-gear"></i> Pengaturan
        </span>
      </Link>
      <button
        onClick={logout}
        className="flex w-full p-3 hover:bg-red-600 hover:text-white text-primary duration-200 cursor-pointer"
      >
        <span className="text-sm flex items-center gap-2 dark:text-white">
          <i className="fa-regular fa-power-off"></i> Keluar
        </span>
      </button>
    </div>
  );
}

export default NavbarDropdown;
