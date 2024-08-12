import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { title as staticTitle } from "../data/static-data";
import Breadcrumb from "../components/Breadcrumb";

function MainLayout({ title, breadcrumb = [], children }) {
  useEffect(() => {
    document.title = `${staticTitle} - ${title}`;
  }, []);

  return (
    <div className="bg-quarternary min-h-[calc(100vh-65px)]">
      <Navbar />
      <div className="px-10 py-5 mt-[65px]">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-bold text-primary">{title}</h1>
          <Breadcrumb items={breadcrumb} />
        </div>
        {children}
      </div>
    </div>
  );
}

export default MainLayout;
