import React from "react";
import MyButton from "./MyButton";

function MyNotification({ type, message, show = false, onClose }) {
  const close = () => {
    document
      .getElementById("notification-body")
      .classList.remove("animation-zoomIn");
    document
      .getElementById("notification-body")
      .classList.add("animation-zoomOut");

    setTimeout(() => {
      onClose();
      document.getElementById("notification").classList.add("hidden");
      document
        .getElementById("notification-body")
        .classList.add("animation-zoomIn");
      document
        .getElementById("notification-body")
        .classList.remove("animation-zoomOut");
    }, 400);
  };

  document.addEventListener("click", (e) => {
    if (e.target.id == "notification") {
      close();
    }
  });

  return (
    <div
      id="notification"
      className={`${
        !show ? "hidden" : "fixed"
      } left-0 top-0 h-screen w-full flex justify-center items-center bg-black bg-opacity-50 z-[999999]`}
    >
      <div
        id="notification-body"
        className="animation-zoomIn bg-white dark:bg-gray-900 w-[90%] md:w-[60%] lg:w-[40%] px-10 py-8 rounded-lg shadow-lg flex flex-col items-center"
      >
        {type == "success" ? (
          <i className="fa-solid fa-circle-check text-7xl text-green-600"></i>
        ) : (
          <i className="fa-solid fa-circle-xmark text-7xl text-red-600"></i>
        )}
        <div className="mt-10 mb-7 flex flex-col gap-2">
          <h1 className="poppins-medium text-3xl text-center dark:text-white">
            {type == "success" ? "Berhasil" : "Gagal"}
          </h1>
          <span className="text-lg text-gray-700 text-center dark:text-white">
            {message}
          </span>
        </div>
        <MyButton
          onClick={close}
          text={"Tutup"}
          className={
            "bg-primary rounded-lg focus:ring-4 focus:ring-primary-light hover:bg-primary-hover w-1/3 text-sm dark:bg-white dark:text-gray-900 dark:hover:bg-gray-300"
          }
        />
      </div>
    </div>
  );
}

export default MyNotification;
