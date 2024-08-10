import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { title } from "../data/static-data";

function Home() {
  useEffect(() => {
    document.title = `${title} - Home`;
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold">Halaman Home</h1>
      <Link className="underline block mt-2 text-blue-800" to="/about-us">
        About Us
      </Link>
    </>
  );
}

export default Home;
