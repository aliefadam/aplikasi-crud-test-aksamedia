import React, { useState } from "react";
import NavbarDropdown from "./NavbarDropdown";
import Utils from "../utils/Utils";
import NavbarDropdownTheme from "./NavbarDropdownTheme";

function NavbarItem() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showTheme, setShowTheme] = useState(false);

  const [name, setName] = useState(
    Utils.getFromLocalStorage("credentials").name
  );

  const handleClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClickTheme = () => {
    setShowTheme(!showTheme);
  };

  document.addEventListener("click", ({ target }) => {
    if (
      target.id !== "dropdown" &&
      !document.getElementById("open-dropdown").contains(target)
    ) {
      setShowDropdown(false);
    }

    if (
      target.id !== "dropdown-theme" &&
      !document.getElementById("open-dropdown-theme").contains(target)
    ) {
      setShowTheme(false);
    }
  });

  return (
    <div className="flex items-center gap-3 md:gap-7 lg:gap-7">
      <div id="dropdown-theme" className="relative">
        <div
          id="open-dropdown-theme"
          className="flex items-center gap-1.5 md:gap-2 lg:gap-2 cursor-pointer text-white dark:text-gray-800 dark:hover:text-gray-900 hover:text-gray-300 duration-200 text-[10px] md:text-base lg:text-base"
          onClick={handleClickTheme}
        >
          <i className="fa-solid fa-moon text-sm"></i>
          <div className="flex items-center gap-1.5 md:gap-2 lg:gap-2">
            <span>Tema</span>
            <i className="fa-solid fa-sort-down -translate-y-1"></i>
          </div>
        </div>
        {showTheme && <NavbarDropdownTheme />}
      </div>
      <div id="dropdown" className="relative">
        <div
          id="open-dropdown"
          className="flex items-center gap-1.5 md:gap-2 lg:gap-2 cursor-pointer text-white dark:text-gray-800 dark:hover:text-gray-900 hover:text-gray-300 duration-200 text-[10px] md:text-base lg:text-base"
          onClick={handleClick}
        >
          <i className="fa-solid fa-user text-sm"></i>
          <div className="flex items-center gap-1.5 md:gap-2 lg:gap-2">
            Halo, <span id="navbar-name-login">{name}</span>{" "}
            <i className="fa-solid fa-sort-down -translate-y-1"></i>
          </div>
        </div>
        {showDropdown && <NavbarDropdown />}
      </div>
    </div>
  );
}

export default NavbarItem;
