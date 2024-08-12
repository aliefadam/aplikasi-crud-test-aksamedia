import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyButton from "../components/MyButton";
import MainLayout from "../layouts/MainLayout";
import FormInput from "../components/FormInput";
import MyNotification from "../components/MyNotification";
import Utils from "../utils/Utils";
import DeleteModal from "../components/DeleteModal";
import Pagination from "../components/Pagination";

function Home() {
  const [showNotification, setShowNotification] = useState(
    Utils.getFromLocalStorage("notifikasi") ? true : false
  );
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [nimDelete, setNimDelete] = useState(0);

  const navigate = useNavigate();
  const [search, setSearch] = useState(Utils.getParam("search") || "");
  const [page, setPage] = useState(parseInt(Utils.getParam("page")) || 1);
  const [startPage, setStartPage] = useState(page - 1);
  const [endPage, setEndPage] = useState(page);
  const perPage = 4;

  useEffect(() => {
    setPage(parseInt(Utils.getParam("page")) || 1);
  }, [window.location.search]);
  useEffect(() => {
    setStartPage((page - 1) * perPage);
    setEndPage(page * perPage);
  }, [page]);

  console.log({ page, startPage, endPage });

  const showNotif = () => {
    setShowNotification(true);
  };

  const hideNotif = () => {
    Utils.removeFromLocalStorage("notifikasi");
    setShowNotification(false);
  };

  const hideConfirmationDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const confirmationDelete = () => {
    const mahasiswaDB = Utils.getFromLocalStorage("mahasiswa") || [];
    const newMahasiswaDB = mahasiswaDB.filter((mahasiswa) => {
      return mahasiswa.nim !== nimDelete;
    });

    Utils.saveToLocalStorage("mahasiswa", newMahasiswaDB);

    Utils.saveToLocalStorage("notifikasi", {
      type: "success",
      message: "Mahasiswa dihapus",
    });

    setShowDeleteConfirmation(false);
    displayMahasiswa();
    setShowNotification(true);
  };

  const handleSearch = () => {
    navigate(`/?search=${search}&page=${page}`);
  };

  const getMahasiswa = () => {
    const mahasiswaDB = Utils.getFromLocalStorage("mahasiswa") || [];
    return mahasiswaDB.slice(startPage, endPage);
  };

  const displayMahasiswa = () => {
    if (getMahasiswa().length == 0) {
      return (
        <tr className="">
          <td colSpan={6} className="text-center bg-white p-3 poppins-medium">
            Tidak ada data
          </td>
        </tr>
      );
    }

    return getMahasiswa().map((mahasiswa, index) => (
      <tr className="bg-white" key={index}>
        <td className="p-3 border-b text-center poppins-semibold">
          {startPage + index + 1}
        </td>
        <td className="p-3 border-b text-center">{mahasiswa.nim}</td>
        <td className="p-3 border-b text-center">{mahasiswa.nama}</td>
        <td className="p-3 border-b text-center">{mahasiswa.semester}</td>
        <td className="p-3 border-b text-center">{mahasiswa.jurusan}</td>
        <td className="p-3 border-b text-center">
          <div className="flex gap-3 justify-center">
            <Link
              to={`/edit-mahasiswa?nim=${mahasiswa.nim}`}
              className="text-primary hover:text-primary-hover"
            >
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
            <Link
              to={`#`}
              onClick={(e) => handleDelete(e, mahasiswa.nim)}
              className="text-primary hover:text-primary-hover"
            >
              <i className="fa-regular fa-trash"></i>
            </Link>
          </div>
        </td>
      </tr>
    ));
  };

  const handleDelete = (e, nim) => {
    e.preventDefault();
    setNimDelete(nim);

    setShowDeleteConfirmation(true);
  };

  return (
    <MainLayout title={"Beranda"}>
      {showNotification && (
        <MyNotification
          type={Utils.getFromLocalStorage("notifikasi")["type"]}
          message={Utils.getFromLocalStorage("notifikasi")["message"]}
          show={true}
          onClose={hideNotif}
        />
      )}

      {showDeleteConfirmation && (
        <DeleteModal
          type={"success"}
          message={"tes"}
          show={true}
          onClose={hideConfirmationDelete}
          onConfirm={confirmationDelete}
        />
      )}

      <div className="flex justify-between">
        <div className="flex gap-3">
          <FormInput
            value={search}
            type={"text"}
            label={""}
            placeholder={"Cari Mahasiswa..."}
            icon={<i className="fa-regular fa-magnifying-glass"></i>}
            className={"w-[400px]"}
            onChange={(e) => setSearch(e.target.value)}
          />
          <MyButton
            onClick={handleSearch}
            type={"button"}
            text={"Cari"}
            className={"bg-tertiary hover:bg-tertiary-hover rounded-md"}
          />
        </div>
        <div className="flex">
          <Link
            to={"/tambah-mahasiswa"}
            className="bg-tertiary hover:bg-tertiary-hover duration-200 text-white flex gap-2 items-center rounded-md px-5 text-sm"
          >
            <i className="fa-regular fa-user-plus"></i> Tambah Mahasiswa
          </Link>
        </div>
      </div>

      <div className="mt-10">
        <table className="w-full border-2 border-primary">
          <thead>
            <tr className="p-2 bg-primary text-white">
              <th className="p-3">No</th>
              <th className="p-3">NIM</th>
              <th className="p-3">Nama</th>
              <th className="p-3">Semester</th>
              <th className="p-3">Jurusan</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>

          <tbody>{displayMahasiswa()}</tbody>
        </table>

        <div className="flex justify-end mt-5">
          <Pagination page={page} />
        </div>
      </div>
    </MainLayout>
  );
}

export default Home;
