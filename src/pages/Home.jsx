import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyButton from "../components/MyButton";
import MainLayout from "../layouts/MainLayout";
import FormInput from "../components/FormInput";
import MyNotification from "../components/MyNotification";
import Utils from "../utils/Utils";
import DeleteModal from "../components/DeleteModal";
import Pagination from "../components/Pagination";
import { paginationView } from "../data/static-data";

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
  const perPage = paginationView;

  useEffect(() => {
    setPage(parseInt(Utils.getParam("page")) || 1);
  }, [window.location.search]);
  useEffect(() => {
    setStartPage((page - 1) * perPage);
    setEndPage(page * perPage);
  }, [page]);

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

  const handleSearch = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    if (page != 1) {
      if (newSearch === "") {
        navigate(`/?page=1`);
      } else {
        navigate(`/?page=1&search=${newSearch}`);
      }
    } else {
      if (newSearch === "") {
        navigate(`/?page=${page}`);
      } else {
        navigate(`/?page=${page}&search=${newSearch}`);
      }
    }
  };

  const getMahasiswa = (forPagination = false) => {
    let mahasiswaDB = Utils.getFromLocalStorage("mahasiswa") || [];
    const searchLower = search.toLowerCase();
    mahasiswaDB = mahasiswaDB.filter(
      (mahasiswa) =>
        mahasiswa.nim.toLowerCase().includes(searchLower) ||
        mahasiswa.nama.toLowerCase().includes(searchLower) ||
        mahasiswa.semester.toLowerCase().includes(searchLower) ||
        mahasiswa.jurusan.toLowerCase().includes(searchLower)
    );

    return forPagination ? mahasiswaDB : mahasiswaDB.slice(startPage, endPage);
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
            id={"search"}
            placeholder={"Cari Mahasiswa..."}
            icon={
              <i className="fa-regular fa-magnifying-glass dark:text-white"></i>
            }
            className={"w-[420px]"}
            onChange={(e) => handleSearch(e)}
          />
        </div>
        <div className="flex">
          <Link
            to={"/tambah-mahasiswa"}
            className="bg-tertiary dark:bg-yellow-600 dark:hover:bg-yellow-700 hover:bg-tertiary-hover duration-200 text-white flex gap-2 items-center rounded-md px-5 text-sm"
          >
            <i className="fa-regular fa-user-plus"></i> Tambah Mahasiswa
          </Link>
        </div>
      </div>

      <div className="mt-10">
        <table className="w-full border-2 border-primary dark:border-gray-900">
          <thead>
            <tr className="p-2 bg-primary text-white dark:bg-gray-900">
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
          <Pagination
            page={page}
            totalData={getMahasiswa(true).length}
            search={search}
          />
        </div>
      </div>
    </MainLayout>
  );
}

export default Home;
