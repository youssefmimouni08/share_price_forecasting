import React, { useState } from "react";
import { addUser } from "../../../redux/actions/user";
import { connect } from "react-redux";

const UserAdd = ({ addUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [formChanged, setFormChanged] = useState(false);

  const handleNameChange = (e) => {
    setName(e);
    setFormChanged(true);
  };

  const handleEmailChange = (e) => {
    setEmail(e);
    setFormChanged(true);
  };

  const handleRoleChange = (e) => {
    setRole(e);
    setFormChanged(true);
  };
  const handlePasswordChange = (e) => {
    setPassword(e);
    setFormChanged(true);
  };
  // Options for the role select dropdown
  const roleOptions = ["superUser", "user", "admin"];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, role, password);
    addUser(name, email, role, password);
    // send updated data to the server here
  };
  return (
    <div className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-xl w-full h-full rounded-2xl shadow-lg p-10 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-1/2 h-fit bg-gray-800 p-7  text-white flex flex-col justify-between"
      >
        <div>
          <div className="flex flex-wrap -mx-3 mb-6 ">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide  text-xs font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="appearance-none block w-full text-gray-700 bg-gray-400  border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="name"
                type="text"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6 ">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide  text-xs font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="appearance-none block w-full text-gray-700 bg-gray-400  border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="email"
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6 ">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide  text-xs font-bold mb-2"
                htmlFor="email"
              >
                Password
              </label>
              <input
                className="appearance-none block w-full text-gray-700 bg-gray-400  border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="password"
                type="password"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6 ">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide  text-xs font-bold mb-2"
                htmlFor="role"
              >
                Role
              </label>
              <div className="relative">
                <select
                  className="appearance-none block w-full text-gray-700 bg-gray-400  border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="role"
                  value={role}
                  onChange={(e) => handleRoleChange(e.target.value)}
                >
                  {roleOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button
            disabled={!formChanged}
            className={`w-full h-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-70 disabled:cursor-not-allowed `}
            type="submit"
          >
            Add User
          </button>
        </div>
      </form>
    </div>
  );
};

export default connect(null, { addUser })(UserAdd);
