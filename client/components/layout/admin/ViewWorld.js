import React from "react";
import AdminMenu from "../../ui/AdminMenu";
import Sidebar from "../../ui/Sidebar";
import WorldData from "../../admin/worlddata/WorldData";

const ViewWorld = () => {
  return (
    <div className="bg-mesh bg-no-repeat bg-cover flex p-5 space-x-5 h-screen font-mono">
      <Sidebar />
      <div className="flex flex-col w-full space-y-5">
        <AdminMenu />
        <WorldData />
      </div>
    </div>
  );
};

export default ViewWorld;
