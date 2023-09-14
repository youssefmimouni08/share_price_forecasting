import Link from "next/link";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  deleteUser,
  getAllUsers,
  getUserDetails,
} from "../../../redux/actions/user";
import Loading from "../../ui/Loading";

const ListUsers = ({
  users: { all_users, loading },
  getAllUsers,
  deleteUser,
}) => {
  useEffect(() => {
    getAllUsers();
  }, []);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
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
  const onDelete = (id) => {
    deleteUser(id);
  };
  const sortedData = all_users.sort((a, b) => {
    if (sortDirection === "asc") {
      return a[sortColumn] > b[sortColumn] ? 1 : -1;
    } else {
      return a[sortColumn] < b[sortColumn] ? 1 : -1;
    }
  });

  const startIndex = (page - 1) * perPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + perPage);

  return (
    <div className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-xl w-full h-full rounded-2xl shadow-lg p-10 flex justify-center items-start">
      <table className="w-full text-sm text-left  text-gray-500 dark:text-gray-400">
        <thead className="text-xs rounded-2xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th
              className="px-6 py-3 cursor-pointer"
              onClick={() => handleSort("name")}
            >
              Name
              {sortColumn === "name" && (
                <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
              )}
            </th>
            <th
              className="px-6 py-3 cursor-pointer"
              onClick={() => handleSort("email")}
            >
              Email
              {sortColumn === "email" && (
                <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
              )}
            </th>
            <th
              className="px-6 py-3 cursor-pointer"
              onClick={() => handleSort("role")}
            >
              Role
              {sortColumn === "role" && (
                <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
              )}
            </th>
            <th
              className="px-6 py-3 cursor-pointer"
              onClick={() => handleSort("date")}
            >
              Date
              {sortColumn === "date" && (
                <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
              )}
            </th>
            <th className="px-6 py-3">Update</th>
            <th className="px-6 py-3">Delete</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData &&
            paginatedData.map((row, index) => (
              <tr
                key={index}
                className="bg-white  dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {row.name}
                </td>
                <td className="py-4 px-6">{row.email}</td>
                <td className="py-4 px-6">{row.role}</td>
                <td className="py-4 px-6">{row.date}</td>
                <td className="py-4 px-6">
                  <Link
                    href={`users/${row._id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Update
                  </Link>
                </td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => onDelete(row._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
const mapStateToProps = (state) => ({
  users: state.users,
});
export default connect(mapStateToProps, {
  getAllUsers,
  getUserDetails,
  deleteUser,
})(ListUsers);
