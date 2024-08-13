import React from "react";
import NavbarItem from "./NavbarItem";

function Navbar() {
  return (
    <nav className="fixed z-[99] top-0 w-full bg-primary dark:bg-quarternary h-[65px] px-3 md:px-10 lg:px-10 text-white flex justify-between items-center leading-none">
      <h1 className="text-sm md:text-xl lg:text-xl w-[150px] md:w-fit lg:w-fit poppins-bold text-white dark:text-gray-800">
        Aplikasi CRUD Mahasiwa
      </h1>
      <NavbarItem />
    </nav>
  );
}

export default Navbar;
