import React, { useEffect, useState } from "react";
import FormInput from "../components/FormInput";
import MyButton from "../components/MyButton";
import { title, credentials } from "../data/static-data";
import { useNavigate } from "react-router-dom";

function Login() {
  useEffect(() => {
    document.title = `${title} - Login`;
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    if (
      username === credentials.username &&
      password === credentials.password
    ) {
      navigate("/");
    } else {
      console.log("GAGAL");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="p-10 bg-white shadow-lg rounded-xl w-[40%]">
        <i className="fa-regular fa-users flex justify-center mb-5 text-4xl text-primary"></i>
        <h1 className="poppins-bold text-3xl text-center text-primary">
          Login
        </h1>

        <form className="flex flex-col mt-10" onSubmit={login} method="POST">
          <FormInput
            type={"text"}
            placeholder={"admin"}
            label={"Username"}
            icon={<i className="fa-regular fa-user"></i>}
            onChange={({ target }) => setUsername(target.value)}
          />
          <FormInput
            type={"password"}
            placeholder={"******"}
            label={"Password"}
            icon={<i className="fa-regular fa-lock"></i>}
            onChange={({ target }) => setPassword(target.value)}
          />
          <MyButton
            type={"submit"}
            text={"Login"}
            icon={<i className="fa-regular fa-right-to-bracket"></i>}
            className={
              "bg-primary w-full mt-2 focus:ring-4 focus:ring-primary-light hover:bg-primary-hover"
            }
          />
        </form>
      </div>
    </div>
  );
}

export default Login;
