import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { title } from "../data/static-data";

function About() {
  useEffect(() => {
    document.title = `${title} - About Us`;
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold">Halaman About</h1>

      <Link className="underline block mt-2 text-blue-800" to="/">
        Home
      </Link>
    </>
  );
}

export default About;
