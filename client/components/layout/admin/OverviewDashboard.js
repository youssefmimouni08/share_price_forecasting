import React from "react";
import Overview from "../../admin/Overview";
import AdminMenu from "../../ui/AdminMenu";
import Sidebar from "../../ui/Sidebar";

const OverviewDashboard = () => {
  return (
    <div className="bg-[#394251] flex p-5 space-x-5 h-screen font-mono">
      <Sidebar />
      <div className="flex flex-col w-full space-y-5">
        <AdminMenu />
        <Overview />
      </div>
    </div>
  );
};

export default OverviewDashboard;
