import React, { useState } from "react";
import NavbarDropdown from "./NavbarDropdown";
import Utils from "../utils/Utils";

function NavbarItem() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [name, setName] = useState(
    Utils.getFromLocalStorage("credentials").name
  );
  const handleClick = () => {
    setShowDropdown(!showDropdown);
  };

  document.addEventListener("click", ({ target }) => {
    if (
      target.id !== "dropdown" &&
      !document.getElementById("open-dropdown").contains(target)
    ) {
      setShowDropdown(false);
    }
  });

  return (
    <div id="dropdown" className="relative">
      <div
        id="open-dropdown"
        className="flex items-center gap-2 cursor-pointer hover:text-gray-200 duration-200"
        onClick={handleClick}
      >
        <i className="fa-solid fa-user text-sm"></i>
        <div className="flex items-center gap-2">
          Halo, <span id="navbar-name-login">{name}</span>{" "}
          <i className="fa-solid fa-sort-down -translate-y-1"></i>
        </div>
      </div>
      {showDropdown && <NavbarDropdown />}
    </div>
  );
}

export default NavbarItem;
