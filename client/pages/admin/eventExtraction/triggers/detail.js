import React, { Fragment } from "react";
import Head from "next/head";
import DetailTrigger from "../../../../components/admin/eventExtraction/triggers/DetailTrigger";
import AdminMenu from "../../../../components/ui/AdminMenu";
import Sidebar from "../../../../components/ui/Sidebar";

import React from "react";

const detail = () => {
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
          <DetailTrigger />
        </div>
      </div>
    </Fragment>
  );
};

export default detail;
