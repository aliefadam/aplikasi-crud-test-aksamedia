import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "./assets/css/main.css";

// Pages
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import AuthMiddleware from "./components/AuthMiddleware.jsx";
import TambahMahasiswa from "./pages/TambahMahasiswa.jsx";
import EditMahasiswa from "./pages/EditMahasiswa.jsx";

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
    path: "/tambah-mahasiswa",
    element: (
      <AuthMiddleware>
        <TambahMahasiswa />
      </AuthMiddleware>
    ),
  },
  {
    path: "/edit-mahasiswa",
    element: (
      <AuthMiddleware>
        <EditMahasiswa />
      </AuthMiddleware>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
