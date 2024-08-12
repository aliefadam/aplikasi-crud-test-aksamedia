import React from "react";
import { Link } from "react-router-dom";
import Utils from "../utils/Utils";

function Pagination({ page }) {
  const totalData = (Utils.getFromLocalStorage("mahasiswa") || []).length;
  const tampilPerHalaman = 4;
  const totalHalaman = Math.ceil(totalData / tampilPerHalaman);
  const halamanSekarang = page;

  const showPaginate = () => {
    let li = [];

    for (let i = 1; i <= totalHalaman; i++) {
      li.push(i);
    }

    return (
      <>
        {li.map((i) => (
          <li key={i}>
            <Link
              to={`/?page=${i}`}
              className={`flex items-center justify-center px-5 h-10 leading-tight ${
                i == halamanSekarang
                  ? "text-primary poppins-medium bg-primary bg-opacity-10 cursor-default"
                  : "hover:bg-gray-100 hover:text-gray-700 text-gray-500 bg-white"
              }  border border-gray-300 `}
            >
              {i}
            </Link>
          </li>
        ))}
      </>
    );
  };
  return (
    <nav>
      <ul className="inline-flex -space-x-px text-sm">
        {page > 1 && (
          <li>
            <Link
              to={`/?page=${page - 1}`}
              className="flex items-center justify-center px-5 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
            >
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </Link>
          </li>
        )}
        {showPaginate()}
        {page < totalHalaman && (
          <li>
            <Link
              to={`/?page=${page + 1}`}
              className="flex items-center justify-center px-5 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
            >
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Pagination;
