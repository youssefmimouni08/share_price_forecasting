import Image from "next/image";
import logo from "../public/Vermeg_logo.png";
import { SearchIcon, MenuIcon, UserCircleIcon } from "@heroicons/react/solid";
import {
  PresentationChartBarIcon,
  PresentationChartLineIcon,
  LoginIcon,
  LogoutIcon,
  UserAddIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../redux/actions/auth";
import { Fragment, useState } from "react";
function Header({ auth: { isAuthenticated, loading }, logout }) {
  const [display, setDisplay] = useState(false);

  const toggle = () => {
    setDisplay(!display);
  };
  const authLinks = (
    <>
      <div className=" hidden md:inline-flex space-x-6">
        <Link
          href="/forecast"
          className="flex space-x-2 items-center cursor-pointer py-2 px-4 hover:bg-[#ddd]"
        >
          <PresentationChartLineIcon className="h-6 " />
          <p>Forecast model</p>
        </Link>
        <Link
          href="/history"
          className="flex space-x-2 items-center cursor-pointer py-2 px-4 hover:bg-[#ddd]"
        >
          <PresentationChartBarIcon className="h-6" />
          <p>My predictions</p>
        </Link>
        <Link
          href="#"
          onClick={logout}
          className="flex space-x-2 items-center cursor-pointer text-black py-2 px-4 hover:bg-[#ddd]"
        >
          <LogoutIcon className="h-6" />
        </Link>
      </div>
      <div className="relative inline-block float-right md:hidden ">
        <button
          onClick={() => toggle()}
          className="flex items-center space-x-2 border-2 p-2 rounded-full cursor-pointer hover:bg-[#2980B9] focus:bg-[#2980B9]"
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
            href="/forecast"
            className="flex space-x-2 items-center cursor-pointer text-black py-3 px-4 hover:bg-[#ddd]"
          >
            <PresentationChartLineIcon className="h-6 " />
            <p>Forecast model</p>
          </Link>
          <Link
            href="/history"
            className="flex space-x-2 items-center cursor-pointer text-black py-3 px-4 hover:bg-[#ddd]"
          >
            <PresentationChartBarIcon className="h-6" />
            <p>My predictions</p>
          </Link>
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
    </>
  );
  const guestLinks = (
    <>
      <div className="hidden md:inline-flex space-x-6">
        <Link
          href="/register"
          className="flex space-x-2 items-center cursor-pointer py-2 px-4 hover:bg-[#ddd]"
        >
          <UserAddIcon className="h-6 " />
          <p>Register</p>
        </Link>
        <Link
          href="/login"
          className="flex space-x-2 items-center cursor-pointer py-2 px-4 hover:bg-[#ddd]"
        >
          <LoginIcon className="h-6" />
          <p>Login</p>
        </Link>
      </div>
      <div className="relative inline-block float-right md:hidden ">
        <button
          onClick={() => toggle()}
          className="flex items-center space-x-2 border-2 p-2 rounded-full cursor-pointer hover:bg-[#2980B9] focus:bg-[#2980B9]"
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
            href="/register"
            className="flex space-x-2 items-center cursor-pointer py-3 px-4 hover:bg-[#ddd]"
          >
            <UserAddIcon className="h-6 " />
            <p>Register</p>
          </Link>
          <Link
            href="/login"
            className="flex space-x-2 items-center cursor-pointer py-3 px-4 hover:bg-[#ddd]"
          >
            <LoginIcon className="h-6" />
            <p>Login</p>
          </Link>
        </div>
      </div>
    </>
  );
  return (
    <header className="font-mono bg-white top-0 z-50 grid grid-cols-2  shadow-md py-5 px-5 md:px-10">
      <Link
        href="/"
        className="relative flex items-center h-5 cursor-pointer my-auto "
        style={{ width: "50%" }}
      >
        <Image
          src={logo}
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </Link>

      <div className="flex items-center justify-end  whitespace-nowrap text-xl">
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </div>
    </header>
  );
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Header);
