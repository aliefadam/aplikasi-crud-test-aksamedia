import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import FormInput from "../components/FormInput";
import FormSelect from "../components/FormSelect";
import MyButton from "../components/MyButton";
import Utils from "../utils/Utils";
import { useNavigate } from "react-router-dom";
import MyNotification from "../components/MyNotification";

function TambahMahasiswa() {
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const [mahasiswa, setMahasiswa] = useState({
    nim: 0,
    nama: "",
    semester: 0,
    jurusan: "Teknik Informatika",
  });

  const tambahMahasiswa = (e) => {
    e.preventDefault();
    const mahasiswaDB = Utils.getFromLocalStorage("mahasiswa") || [];
    const nimExist = mahasiswaDB.some(
      (mahasiswaD) => mahasiswaD.nim === mahasiswa.nim
    );
    if (nimExist) {
      setShowError(true);
    } else {
      mahasiswaDB.push(mahasiswa);
      Utils.saveToLocalStorage("mahasiswa", mahasiswaDB);
      Utils.saveToLocalStorage("notifikasi", {
        type: "success",
        message: "Mahasiswa ditambahkan",
      });
      navigate("/?page=1");
    }
  };

  return (
    <MainLayout title={"Tambah Mahasiswa"} breadcrumb={["Tambah Mahasiswa"]}>
      {showError && (
        <MyNotification
          type={"error"}
          show={true}
          message={"NIM sudah terdaftar"}
          onClose={() => setShowError(false)}
        />
      )}
      <form
        onSubmit={tambahMahasiswa}
        method="POST"
        className="bg-white dark:bg-gray-900 w-full md:w-1/2 lg:1/2 rounded-lg shadow-lg p-5 md:p-8 lg:p-8 flex flex-col gap-5"
      >
        <FormInput
          type={"number"}
          label={"NIM"}
          icon={<i className="fa-regular fa-list-ol dark:text-white"></i>}
          onChange={(e) => setMahasiswa({ ...mahasiswa, nim: e.target.value })}
        />
        <FormInput
          label={"Nama"}
          icon={<i className="fa-regular fa-user dark:text-white"></i>}
          onChange={(e) => setMahasiswa({ ...mahasiswa, nama: e.target.value })}
        />
        <FormInput
          type={"number"}
          label={"Semester"}
          icon={<i className="fa-regular fa-list-ol dark:text-white"></i>}
          onChange={(e) =>
            setMahasiswa({ ...mahasiswa, semester: e.target.value })
          }
        />
        <FormSelect
          label={"Jurusan"}
          options={["Teknik Informatika", "Teknik Mesin", "Teknik Industri"]}
          onChange={(e) =>
            setMahasiswa({ ...mahasiswa, jurusan: e.target.value })
          }
        />
        <div className="flex justify-end">
          <MyButton
            text={"Tambah"}
            className={
              "bg-primary rounded-lg py-3.5 dark:bg-white dark:text-gray-900"
            }
            icon={<i className="fa-regular fa-user-plus"></i>}
          />
        </div>
      </form>
    </MainLayout>
  );
}

export default TambahMahasiswa;
