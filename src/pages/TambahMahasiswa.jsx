import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import FormInput from "../components/FormInput";
import FormSelect from "../components/FormSelect";
import MyButton from "../components/MyButton";
import Utils from "../utils/Utils";
import { useNavigate } from "react-router-dom";

function TambahMahasiswa() {
  const navigate = useNavigate();
  const [mahasiswa, setMahasiswa] = useState({
    nim: 0,
    nama: "",
    semester: 0,
    jurusan: "Teknik Informatika",
  });

  const tambahMahasiswa = (e) => {
    e.preventDefault();
    const mahasiswaDB = Utils.getFromLocalStorage("mahasiswa") || [];
    mahasiswaDB.push(mahasiswa);
    Utils.saveToLocalStorage("mahasiswa", mahasiswaDB);
    Utils.saveToLocalStorage("notifikasi", {
      type: "success",
      message: "Mahasiswa ditambahkan",
    });
    navigate("/");
  };

  return (
    <MainLayout title={"Tambah Mahasiswa"} breadcrumb={["Tambah Mahasiswa"]}>
      <form
        onSubmit={tambahMahasiswa}
        method="POST"
        className="bg-white w-1/2 rounded-lg shadow-lg p-8 flex flex-col gap-5"
      >
        <FormInput
          type={"number"}
          label={"NIM"}
          icon={<i className="fa-regular fa-list-ol"></i>}
          onChange={(e) => setMahasiswa({ ...mahasiswa, nim: e.target.value })}
        />
        <FormInput
          label={"Nama"}
          icon={<i className="fa-regular fa-user"></i>}
          onChange={(e) => setMahasiswa({ ...mahasiswa, nama: e.target.value })}
        />
        <FormInput
          type={"number"}
          label={"Semester"}
          icon={<i className="fa-regular fa-list-ol"></i>}
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
            className={"bg-primary rounded-lg py-3.5"}
            icon={<i className="fa-regular fa-user-plus"></i>}
          />
        </div>
      </form>
    </MainLayout>
  );
}

export default TambahMahasiswa;
