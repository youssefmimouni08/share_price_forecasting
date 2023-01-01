import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../../../ui/Loading";

const Table = ({ data }) => {
  const loading = useSelector((state) => state.events.loading);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(4);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedData = data.sort((a, b) => {
    if (sortDirection === "asc") {
      return a[sortColumn] > b[sortColumn] ? 1 : -1;
    } else {
      return a[sortColumn] < b[sortColumn] ? 1 : -1;
    }
  });

  const startIndex = (page - 1) * perPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + perPage);
  return (
    <>
      <table className="w-full text-sm text-left  text-gray-500 dark:text-gray-400">
        <thead className="text-xs rounded-2xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th
              className="px-6 py-3 cursor-pointer"
              onClick={() => handleSort("event")}
            >
              Event Type
              {sortColumn === "event" && (
                <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
              )}
            </th>
            <th
              className="px-6 py-3 cursor-pointer"
              onClick={() => handleSort("argument")}
            >
              Argument Role
              {sortColumn === "argument" && (
                <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
              )}
            </th>
            <th
              className="px-6 py-3 cursor-pointer"
              onClick={() => handleSort("question")}
            >
              Question
              {sortColumn === "question" && (
                <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
              )}
            </th>

            <th className="px-6 py-3">Update</th>
            <th className="px-6 py-3">Delete</th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            paginatedData &&
            paginatedData.map((row, index) => (
              <tr
                key={index}
                className="bg-white  dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {row.event}
                </td>

                <td className="py-4 px-6">
                  {row.questionTemplate.map((a) => (
                    <>
                      {a.argumentRole} <br />
                    </>
                  ))}
                </td>
                <td className="py-4 px-6">
                  {row.questionTemplate.map((a) => (
                    <>
                      {a.question} <br />
                    </>
                  ))}
                </td>

                <td className="py-4 px-6">
                  <Link
                    href={`eventTypes/${row._id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Update
                  </Link>
                </td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => onDelete(row.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <Loading />
          )}
        </tbody>
      </table>
      <div className="my-4 flex justify-between">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="btn"
        >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page * perPage >= data.length}
          className="btn"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Table;
