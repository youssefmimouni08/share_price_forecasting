import Head from "next/head";
import React, { Fragment } from "react";
import DetailEvent from "../../../../components/admin/eventExtraction/eventTypes/DetailEvent";
import AdminMenu from "../../../../components/ui/AdminMenu";
import Sidebar from "../../../../components/ui/Sidebar";

const detail = () => {
  return (
    <Fragment>
      <Head>
        <title>Event Extraction | Admin dashboard</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <div className="bg-[#394251] flex p-5 space-x-5 h-screen font-mono">
        <Sidebar />
        <div className="flex flex-col w-full space-y-5">
          <AdminMenu />
          <DetailEvent />
        </div>
      </div>
    </Fragment>
  );
};

export default detail;
