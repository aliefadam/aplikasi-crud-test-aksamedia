import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Utils from "../utils/Utils";

function NavbarDropdownTheme() {
  useEffect(() => {});

  const [mode, setMode] = useState({
    name:
      Utils.getFromLocalStorage("theme") == null
        ? "Terang"
        : Utils.getFromLocalStorage("theme").name,
    icon: Utils.getFromLocalStorage("theme") == null ? "fa-moon" : "fa-sun",
  });

  const changeMode = (theme) => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else if (theme === "system") {
      const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (prefersDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }

    setMode({
      name: theme,
      icon:
        theme === "dark" ||
        (theme === "system" &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
          ? "fa-sun"
          : "fa-moon",
    });

    Utils.saveToLocalStorage("theme", {
      name: theme,
      icon:
        theme === "dark" ||
        (theme === "system" &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
          ? "fa-sun"
          : "fa-moon",
    });
  };

  return (
    <div className="absolute bg-white w-[200px] -bottom-[146px] right-0 shadow-md rounded-md overflow-hidden dark:bg-gray-800">
      <button
        onClick={() => changeMode("light")}
        className="flex w-full p-3 hover:bg-gray-200 duration-200 cursor-pointer border-b-2 dark:hover:bg-gray-900"
      >
        <span className="text-primary text-sm flex items-center gap-2 dark:text-white">
          <i className="fa-regular fa-sun"></i> Mode Terang
        </span>
      </button>
      <button
        className="flex w-full p-3 hover:bg-gray-200 duration-200 cursor-pointer border-b-2 dark:hover:bg-gray-900"
        onClick={() => changeMode("dark")}
      >
        <span className="text-primary text-sm flex items-center gap-2 dark:text-white">
          <i className="fa-regular fa-moon"></i> Mode Gelap
        </span>
      </button>
      <button
        className="flex w-full p-3 hover:bg-gray-200 duration-200 text-primary cursor-pointer dark:hover:bg-gray-900"
        onClick={() => changeMode("system")}
      >
        <span className="text-sm flex items-center gap-2 dark:text-white">
          <i className="fa-regular fa-gear"></i> Sistem
        </span>
      </button>
    </div>
  );
}

export default NavbarDropdownTheme;
