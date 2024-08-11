import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { title } from "../data/static-data";
import MyButton from "../components/MyButton";
import Utils from "../utils/Utils";

function Home() {
  useEffect(() => {
    document.title = `${title} - Home`;
  }, []);

  const navigate = useNavigate();
  const logout = () => {
    Utils.removeFromLocalStorage("login");
    navigate("/login");
  };

  return (
    <>
      <h1 className="text-3xl font-bold">Halaman Home</h1>
      <Link className="underline block mt-2 text-blue-800" to="/about-us">
        About Us
      </Link>
      <MyButton
        type={"button"}
        onClick={logout}
        text={"Logout"}
        className={"bg-red-600 text-white mt-5"}
      />
    </>
  );
}

export default Home;
