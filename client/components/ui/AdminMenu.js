import {
  LoginIcon,
  LogoutIcon,
  MenuIcon,
  UserAddIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../redux/actions/auth";

const AdminMenu = ({ auth: { isAuthenticated, loading }, logout }) => {
  const [display, setDisplay] = useState(false);

  const toggle = () => {
    setDisplay(!display);
  };

  const authLinks = (
    <div className="relative inline-block float-right  ">
      <button
        onClick={() => toggle()}
        className="flex  items-center space-x-2  p-1  rounded-full cursor-pointer hover:bg-[#2980B9] focus:bg-[#2980B9]"
      >
        <MenuIcon className="h-6" />
        <UserCircleIcon className="h-6" />
      </button>
      <div
        id="myDropdown"
        className={`absolute bg-[#f1f1f1] min-w-1 shadow-md right-0 `}
        style={{ zIndex: 1, display: display ? "block" : "none" }}
      >
        <Link
          href="#"
          onClick={logout}
          className="flex space-x-2 items-center cursor-pointer text-black py-3 px-4 hover:bg-[#ddd]"
        >
          <LogoutIcon className="h-6" />
          <p>Logout</p>
        </Link>
      </div>
    </div>
  );

  const guestLinks = (
    <div className="relative inline-block float-right  ">
      <button
        onClick={() => toggle()}
        className="flex  items-center space-x-2  p-1  rounded-full cursor-pointer hover:bg-[#2980B9] focus:bg-[#2980B9]"
      >
        <MenuIcon className="h-6" />
        <UserCircleIcon className="h-6" />
      </button>

      <div
        id="myDropdown"
        className={`absolute bg-gray-800 min-w-1 shadow-md right-0 `}
        style={{ zIndex: 1, display: display ? "block" : "none" }}
      >
        <Link
          href="/login"
          className="flex space-x-2 items-center cursor-pointer py-3 px-4 hover:bg-[#ddd]"
        >
          <LoginIcon className="h-6" />
          <p>Login</p>
        </Link>
      </div>
    </div>
  );
  return (
    <div className="flex justify-end  bg-white bg-opacity-30 backdrop-filter backdrop-blur-xl rounded-2xl shadow-lg p-4  h-16 text-gray-400">
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(AdminMenu);
