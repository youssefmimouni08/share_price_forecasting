import React, { Fragment } from "react";
import Head from "next/head";
import ListTriggers from "../../../../components/admin/eventExtraction/triggers/ListTriggers";
import AdminMenu from "../../../../components/ui/AdminMenu";
import Sidebar from "../../../../components/ui/Sidebar";

const index = () => {
  return (
    <Fragment>
      <Head>
        <title>Event Extraction | Admin dashboard</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <div className="bg-mesh bg-no-repeat bg-cover flex p-5 space-x-5 h-screen font-mono">
        <Sidebar />
        <div className="flex flex-col w-full space-y-5">
          <AdminMenu />
          <ListTriggers />
        </div>
      </div>
    </Fragment>
  );
};

export default index;
