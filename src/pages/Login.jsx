import React, { useEffect, useState } from "react";
import FormInput from "../components/FormInput";
import MyButton from "../components/MyButton";
import { title, credentials } from "../data/static-data";
import { useNavigate } from "react-router-dom";
import MyNotification from "../components/MyNotification";
import Utils from "../utils/Utils";

function Login() {
  useEffect(() => {
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

  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();

    setProcess(true);
    setTimeout(() => {
      if (
        username === credentials.username &&
        password === credentials.password
      ) {
        Utils.saveToLocalStorage("login", true);
        navigate("/");
      } else {
        setPassword("");
        showNotif();
        setProcess(false);
      }
    }, 500);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <MyNotification
        type="error"
        message="Username atau password salah!"
        show={showNotification}
        onClose={hideNotif}
      />
      <div className="p-10 bg-white shadow-lg rounded-xl w-[40%]">
        <i className="fa-regular fa-users flex justify-center mb-5 text-4xl text-primary"></i>
        <h1 className="poppins-bold text-3xl text-center text-primary">
          Login
        </h1>
        <form className="flex flex-col mt-10" onSubmit={login} method="POST">
          <FormInput
            value={username}
            type={"text"}
            placeholder={"admin"}
            label={"Username"}
            icon={<i className="fa-regular fa-user"></i>}
            onChange={({ target }) => setUsername(target.value)}
          />
          <FormInput
            value={password}
            type={"password"}
            placeholder={"******"}
            label={"Password"}
            icon={<i className="fa-regular fa-lock"></i>}
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
            className={`bg-primary ${
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
