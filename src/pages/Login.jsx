import React, { useEffect, useState } from "react";
import FormInput from "../components/FormInput";
import MyButton from "../components/MyButton";
import { title, credentials } from "../data/static-data";
import { useNavigate } from "react-router-dom";
import MyNotification from "../components/MyNotification";
import Utils from "../utils/Utils";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    if (Utils.getFromLocalStorage("theme") == null) {
      document.documentElement.classList.remove("dark");
    } else {
      if (Utils.getFromLocalStorage("theme").name === "Gelap") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
    if (Utils.getFromLocalStorage("login")) {
      navigate("/?page=1");
    }
    document.title = `${title} - Login`;
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [process, setProcess] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const showNotif = () => {
    setShowNotification(true);
  };

  const hideNotif = () => {
    setShowNotification(false);
  };

  const login = (e) => {
    e.preventDefault();

    setProcess(true);
    setTimeout(() => {
      if (
        username === credentials.username &&
        password === credentials.password
      ) {
        Utils.saveToLocalStorage("login", true);
        Utils.saveToLocalStorage("credentials", credentials);
        navigate("/?page=1");
      } else {
        setPassword("");
        showNotif();
        setProcess(false);
      }
    }, 500);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-quarternary dark:bg-gray-800">
      <MyNotification
        type="error"
        message="Username atau password salah!"
        show={showNotification}
        onClose={hideNotif}
      />
      <div className="p-10 bg-white dark:bg-gray-900 shadow-lg rounded-xl w-[40%]">
        <i className="fa-regular fa-users flex justify-center mb-5 text-4xl text-primary dark:text-white"></i>
        <h1 className="poppins-bold text-3xl text-center text-primary dark:text-white">
          Login
        </h1>
        <form
          className="flex flex-col gap-5 mt-10"
          onSubmit={login}
          method="POST"
        >
          <FormInput
            value={username}
            type={"text"}
            placeholder={"admin"}
            label={"Username"}
            icon={<i className="fa-regular fa-user dark:text-white"></i>}
            onChange={({ target }) => setUsername(target.value)}
          />
          <FormInput
            value={password}
            type={"password"}
            placeholder={"******"}
            label={"Password"}
            icon={<i className="fa-regular fa-lock dark:text-white"></i>}
            onChange={({ target }) => setPassword(target.value)}
          />
          <MyButton
            disabled={process}
            type={"submit"}
            text={`${process ? "Loading..." : "Login"}`}
            icon={
              process ? "" : <i className="fa-regular fa-right-to-bracket"></i>
            }
            rounded={true}
            className={`bg-primary dark:bg-white dark:text-gray-900 dark:hover:bg-gray-300 ${
              process
                ? "cursor-not-allowed bg-opacity-50"
                : "focus:ring-primary-light hover:bg-primary-hover"
            } w-full mt-2 focus:ring-4 !p-3.5`}
          />
        </form>
      </div>
    </div>
  );
}

export default Login;
