import React, { useState } from "react";
import NavbarDropdown from "./NavbarDropdown";

function NavbarItem() {
  const [showDropdown, setShowDropdown] = useState(false);
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
          Halo, Admin <i className="fa-solid fa-sort-down -translate-y-1"></i>
        </div>
      </div>
      {showDropdown && <NavbarDropdown />}
    </div>
  );
}

export default NavbarItem;
