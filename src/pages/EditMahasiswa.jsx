import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import FormInput from "../components/FormInput";
import FormSelect from "../components/FormSelect";
import MyButton from "../components/MyButton";
import Utils from "../utils/Utils";
import { useNavigate } from "react-router-dom";

function EditMahasiswa() {
  const getMahasiswa = () => {
    const mahasiswaDB = Utils.getFromLocalStorage("mahasiswa") || [];
    const nim = Utils.getParam("nim");

    return mahasiswaDB.find((mahasiswa) => mahasiswa.nim == nim);
  };

  const navigate = useNavigate();
  const [mahasiswa, setMahasiswa] = useState({
    nim: getMahasiswa().nim,
    nama: getMahasiswa().nama,
    semester: getMahasiswa().semester,
    jurusan: getMahasiswa().jurusan,
  });

  const editMahasiswa = (e) => {
    e.preventDefault();
    const mahasiswaDB = Utils.getFromLocalStorage("mahasiswa") || [];
    const index = mahasiswaDB.findIndex((m) => m.nim == mahasiswa.nim);
    mahasiswaDB[index] = mahasiswa;
    Utils.saveToLocalStorage("mahasiswa", mahasiswaDB);
    Utils.saveToLocalStorage("notifikasi", {
      type: "success",
      message: "Mahasiswa diedit",
    });
    navigate("/?page=1");
  };

  return (
    <MainLayout title={"Edit Mahasiswa"} breadcrumb={["Edit Mahasiswa"]}>
      <form
        onSubmit={editMahasiswa}
        method="POST"
        className="bg-white dark:bg-gray-900 w-full md:w-1/2 lg:1/2 rounded-lg shadow-lg p-5 md:p-8 lg:p-8 flex flex-col gap-5"
      >
        <FormInput
          value={mahasiswa.nim}
          type={"number"}
          label={"NIM"}
          icon={<i className="fa-regular fa-list-ol dark:text-white"></i>}
          className={"bg-gray-300 cursor-not-allowed dark:text-white"}
          disabled={true}
          onChange={(e) => setMahasiswa({ ...mahasiswa, nim: e.target.value })}
        />
        <FormInput
          value={mahasiswa.nama}
          label={"Nama"}
          icon={<i className="fa-regular fa-user dark:text-white"></i>}
          onChange={(e) => setMahasiswa({ ...mahasiswa, nama: e.target.value })}
        />
        <FormInput
          value={mahasiswa.semester}
          type={"number"}
          label={"Semester"}
          icon={<i className="fa-regular fa-list-ol dark:text-white"></i>}
          onChange={(e) =>
            setMahasiswa({ ...mahasiswa, semester: e.target.value })
          }
        />
        <FormSelect
          label={"Jurusan"}
          selected={mahasiswa.jurusan}
          options={["Teknik Informatika", "Teknik Mesin", "Teknik Industri"]}
          onChange={(e) =>
            setMahasiswa({ ...mahasiswa, jurusan: e.target.value })
          }
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

export default EditMahasiswa;
