import React, { useState } from "react";

import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  UserCircleIcon,
  UserGroupIcon,
  UserAddIcon,
  IdentificationIcon,
  AdjustmentsIcon,
  GlobeIcon,
  GlobeAltIcon,
  LibraryIcon,
  CogIcon,
  FlagIcon,
  DatabaseIcon,
  FolderAddIcon,
  LightningBoltIcon,
  CubeTransparentIcon,
} from "@heroicons/react/solid";
import Submenu from "./Submenu";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("");

  function toggleMenu() {
    setIsOpen(!isOpen);
  }
  function closeSubmenu() {
    setSelectedMenuItem("");
  }
  return (
    <div className="relative flex  bg-gray-800 h-full rounded-2xl shadow-lg ">
      <div className="p-3 space-y-5">
        <div className="p-2 hover:bg-gray-700 cursor-pointer">
          {isOpen ? (
            <ChevronDoubleLeftIcon
              onClick={toggleMenu}
              className="h-6  text-white "
            />
          ) : (
            <ChevronDoubleRightIcon
              onClick={toggleMenu}
              className="h-6   text-white "
            />
          )}
        </div>
        <div className={`  ${isOpen ? "w-fit whitespace-nowrap" : ""} `}>
          <ul>
            <li
              className="flex p-2 text-gray-300 hover:bg-gray-700 cursor-pointer"
              onClick={() => setSelectedMenuItem("manageUsers")}
            >
              {isOpen ? (
                <>
                  <UserCircleIcon className="h-6 mr-2" />
                  Manage users
                </>
              ) : (
                <UserCircleIcon className="h-6" />
              )}
            </li>
            <li
              className="flex p-2 text-gray-300 hover:bg-gray-700 cursor-pointer"
              onClick={() => setSelectedMenuItem("manageWorldData")}
            >
              {isOpen ? (
                <>
                  <GlobeIcon className="h-6 mr-2" />
                  Manage World Data
                </>
              ) : (
                <GlobeIcon className="h-6" />
              )}
            </li>
            <li
              className="flex p-2 text-gray-300 hover:bg-gray-700 cursor-pointer"
              onClick={() => setSelectedMenuItem("manageEventTypes")}
            >
              {isOpen ? (
                <>
                  <DatabaseIcon className="h-6 mr-2" />
                  Manage event types
                </>
              ) : (
                <DatabaseIcon className="h-6" />
              )}
            </li>
          </ul>
        </div>
      </div>

      {selectedMenuItem === "manageUsers" && (
        <Submenu
          menuItems={[
            {
              icon: <UserGroupIcon className="h-6 mr-2" />,
              label: "View Users",
              path: "/admin/users/",
            },
            {
              icon: <UserAddIcon className="h-6 mr-2" />,
              label: "Add Users",
              path: "/admin/users/add",
            },
            {
              icon: <IdentificationIcon className="h-6 mr-2" />,
              label: "Grant Privilges",
              path: "/admin/users/detail",
            },
          ]}
          closeSubmenu={closeSubmenu}
        />
      )}
      {selectedMenuItem === "manageWorldData" && (
        <Submenu
          menuItems={[
            {
              icon: <GlobeAltIcon className="h-6 mr-2" />,
              label: "View world data",
              path: "/admin/worldData/",
            },
            {
              icon: <GlobeIcon className="h-6 mr-2" />,
              label: "View continents",
              path: "/admin/worldData/Continents/",
            },
            {
              icon: <FlagIcon className="h-6 mr-2" />,
              label: "View countries",
              path: "/admin/worldData/Countries/",
            },
            {
              icon: <CogIcon className="h-6 mr-2" />,
              label: "View regions",
              path: "/admin/worldData/Regions/",
            },
            {
              icon: <LibraryIcon className="h-6 mr-2" />,
              label: "View provinces",
              path: "/admin/worldData/Provinces/",
            },
          ]}
          closeSubmenu={closeSubmenu}
        />
      )}
      {selectedMenuItem === "manageEventTypes" && (
        <Submenu
          menuItems={[
            {
              icon: <CubeTransparentIcon className="h-6 mr-2" />,
              label: "View event types",
              path: "/admin/eventExtraction/eventTypes/",
            },
            {
              icon: <AdjustmentsIcon className="h-6 mr-2" />,
              label: "Add event types",
              path: "/admin/eventExtraction/eventTypes/add",
            },
            {
              icon: <LightningBoltIcon className="h-6 mr-2" />,
              label: "View triggers",
              path: "/admin/eventExtraction/triggers/",
            },
            {
              icon: <LightningBoltIcon className="h-6 mr-2" />,
              label: "Add triggers",
              path: "/admin/eventExtraction/triggers/add",
            },
            {
              icon: <FolderAddIcon className="h-6 mr-2" />,
              label: "View objects",
              path: "/admin/eventExtraction/objects/",
            },
            {
              icon: <FolderAddIcon className="h-6 mr-2" />,
              label: "Add objects",
              path: "/admin/eventExtraction/objects/add",
            },
          ]}
          closeSubmenu={closeSubmenu}
        />
      )}
    </div>
  );
};

export default Sidebar;
