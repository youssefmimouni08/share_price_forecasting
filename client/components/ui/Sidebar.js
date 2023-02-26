import React, { useState } from "react";
import { useSelector, useDispatch, connect } from "react-redux";

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
import { setSelectedMenuItem } from "../../redux/actions/submenu";
const Sidebar = ({ setSelectedMenuItem, submenu: { selectedMenuItem } }) => {
  const [isOpen, setIsOpen] = useState(false);

  //const [selectedMenuItem, setSelectedMenuItem] = useState("");

  function toggleMenu() {
    setIsOpen(!isOpen);
  }
  function closeSubmenu() {
    setSelectedMenuItem("");
  }
  return (
    <div className="relative flex  bg-white bg-opacity-10 backdrop-filter backdrop-blur-xl h-full rounded-2xl shadow-lg border">
      <div className="p-3 space-y-5">
        <div className="p-2 hover:bg-gray-700 cursor-pointer">
          {isOpen ? (
            <ChevronDoubleLeftIcon
              onClick={toggleMenu}
              className="h-6  text-black "
            />
          ) : (
            <ChevronDoubleRightIcon
              onClick={toggleMenu}
              className="h-6   text-black "
            />
          )}
        </div>
        <div className={`  ${isOpen ? "w-fit whitespace-nowrap" : ""} `}>
          <ul>
            <li
              className="flex p-2 text-black hover:bg-gray-700 cursor-pointer"
              onClick={() => setSelectedMenuItem("manageUsers")}
            >
              {isOpen ? (
                <>
                  <IdentificationIcon className="h-6 mr-2" />
                  Manage users
                </>
              ) : (
                <IdentificationIcon className="h-6" />
              )}
            </li>
            <li
              className="flex p-2 text-black hover:bg-gray-700 cursor-pointer"
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
              className="flex p-2 text-black hover:bg-gray-700 cursor-pointer"
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
              icon: <CogIcon className="h-6 mr-2" />,
              label: "View regions",
              path: "/admin/worldData/Regions/",
            },
            {
              icon: <FlagIcon className="h-6 mr-2" />,
              label: "View countries",
              path: "/admin/worldData/Countries/",
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
const mapStateToProps = (state) => ({
  submenu: state.submenu,
});
export default connect(mapStateToProps, { setSelectedMenuItem })(Sidebar);
