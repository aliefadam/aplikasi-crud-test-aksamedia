import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { title as staticTitle } from "../data/static-data";
import Breadcrumb from "../components/Breadcrumb";
import Utils from "../utils/Utils";

function MainLayout({ title, breadcrumb = [], children }) {
  useEffect(() => {
    document.title = `${staticTitle} - ${title}`;
  }, []);

  const [mode, setMode] = useState({
    name:
      Utils.getFromLocalStorage("theme") == null
        ? "Terang"
        : Utils.getFromLocalStorage("theme").name,
    icon: Utils.getFromLocalStorage("theme") == null ? "fa-moon" : "fa-sun",
  });

  useEffect(() => {
    Utils.applySavedTheme(() => {
      changeMode(mode.name);
    });
  }, []);

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
    <div className="bg-quarternary dark:bg-gray-800 min-h-[calc(100vh-65px)]">
      <Navbar />
      <div className="px-3 md:px-10 lg:px-10 py-5 mt-[65px]">
        <div className="flex flex-col md:flex-row lg:flex-row justify-between items-center mb-5">
          <h1 className="text-2xl md:text-2xl lg:text-2xl font-bold text-primary dark:text-quarternary">
            {title}
          </h1>
          <Breadcrumb items={breadcrumb} />
        </div>
        {children}
      </div>
    </div>
  );
}

export default MainLayout;
