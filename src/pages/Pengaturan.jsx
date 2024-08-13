import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import FormInput from "../components/FormInput";
import MyButton from "../components/MyButton";
import Utils from "../utils/Utils";
import { credentials } from "../data/static-data";
import { useNavigate } from "react-router-dom";
import MyNotification from "../components/MyNotification";

function Pengaturan() {
  const [showNotification, setShowNotification] = useState(false);

  const [name, setName] = useState(
    Utils.getFromLocalStorage("credentials").name
  );
  const chageName = (e) => {
    e.preventDefault();
    credentials.name = name;
    Utils.saveToLocalStorage("credentials", credentials);
    document.getElementById("navbar-name-login").innerHTML = name;

    setShowNotification(true);
  };

  return (
    <MainLayout title={"Pengaturan"} breadcrumb={["Pengaturan"]}>
      {showNotification && (
        <MyNotification
          type="success"
          message="Nama telah diganti"
          show={showNotification}
          onClose={() => setShowNotification(false)}
        />
      )}
      <form
        onSubmit={chageName}
        method="POST"
        className="bg-white dark:bg-gray-900 w-full md:w-1/2 lg:1/2 rounded-lg shadow-lg p-5 md:p-8 lg:p-8 flex flex-col gap-5"
      >
        <FormInput
          value={name}
          type={"text"}
          label={"Edit Nama Lengkap"}
          icon={<i className="fa-regular fa-user dark:text-white"></i>}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="flex justify-end">
          <MyButton
            text={"Simpan"}
            className={
              "bg-primary rounded-lg py-3.5 dark:bg-white dark:text-gray-900"
            }
            icon={<i className="fa-regular fa-floppy-disk"></i>}
          />
        </div>
      </form>
    </MainLayout>
  );
}

export default Pengaturan;
