import React from "react";
import MyButton from "./MyButton";

function DeleteModal({ type, message, show = false, onClose, onConfirm }) {
  const close = () => {
    document
      .getElementById("delete-confirmation-body")
      .classList.remove("animation-zoomIn");
    document
      .getElementById("delete-confirmation-body")
      .classList.add("animation-zoomOut");

    setTimeout(() => {
      onClose();
      document.getElementById("delete-confirmation").classList.add("hidden");
      document
        .getElementById("delete-confirmation-body")
        .classList.add("animation-zoomIn");
      document
        .getElementById("delete-confirmation-body")
        .classList.remove("animation-zoomOut");
    }, 400);
  };

  document.addEventListener("click", (e) => {
    if (e.target.id == "delete-confirmation") {
      close();
    }
  });

  return (
    <div
      id="delete-confirmation"
      className={`${
        !show ? "hidden" : "fixed"
      } left-0 top-0 h-screen w-full flex justify-center items-center bg-black bg-opacity-50 z-[999999]`}
    >
      <div
        id="delete-confirmation-body"
        className="animation-zoomIn bg-white dark:bg-gray-900 w-[35%] px-10 py-8 rounded-lg shadow-lg flex flex-col items-center"
      >
        <i className="fa-solid fa-circle-exclamation text-7xl text-gray-600 dark:text-gray-100"></i>
        <div className="mt-10 mb-7 flex flex-col gap-2">
          <h1 className="poppins-medium text-3xl text-center dark:text-white">
            Konfirmasi
          </h1>
          <span className="text-lg text-gray-700 text-center dark:text-white">
            Apakah anda yakin ingin menghapus data ini?
          </span>
        </div>
        <div className="flex w-full justify-center gap-5">
          <MyButton
            onClick={onConfirm}
            text={"Ya, Yakin!"}
            className={
              "bg-green-600 rounded-lg focus:ring-4 focus:ring-green-300 hover:bg-green-700 w-1/3 text-sm"
            }
          />
          <MyButton
            onClick={close}
            text={"Batal"}
            className={
              "bg-red-600 rounded-lg focus:ring-4 focus:ring-red-300 hover:bg-red-700 w-1/3 text-sm"
            }
          />
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
