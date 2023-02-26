import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  EyeIcon,
  EyeOffIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import React from "react";
import SearchInput from "./SearchInput";

const Submenu = ({ menuItems, closeSubmenu }) => {
  return (
    <div className="p-5 space-y-5 border-l-2 border-blue-700  flex flex-col justify-between text-white w-72 ">
      <div className="space-y-5 flex flex-col ">
        <h2 className="text-lg text-black">Dashboard</h2>
        <SearchInput />
        <ul>
          {menuItems.map((menuItem) => (
            <Link
              href={menuItem.path}
              className="flex p-3 text-black whitespace-nowrap hover:bg-gray-700 cursor-pointer"
              key={menuItem.label}
            >
              <>
                {menuItem.icon}
                {menuItem.label}
              </>
            </Link>
          ))}
        </ul>
      </div>
      <div className="hover:bg-gray-700 cursor-pointer p-3 self-end">
        <EyeIcon className="text-blue-500 h-5 " onClick={closeSubmenu} />
      </div>
    </div>
  );
};

export default Submenu;
