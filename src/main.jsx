import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "./assets/css/main.css";

// Pages
import About from "./pages/About.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import AuthMiddleware from "./components/AuthMiddleware.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <AuthMiddleware>
        <Home />
      </AuthMiddleware>
    ),
  },
  {
    path: "/about-us",
    element: (
      <AuthMiddleware>
        <About />
      </AuthMiddleware>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
