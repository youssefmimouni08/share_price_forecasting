import React, { Fragment } from "react";
import Head from "next/head";
import ListContinents from "../../../../components/admin/worldData/Continents/ListContinents";
import AdminMenu from "../../../../components/ui/AdminMenu";
import Sidebar from "../../../../components/ui/Sidebar";
const index = () => {
  return (
    <Fragment>
      <Head>
        <title>World Data | Admin dashboard</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <div className="bg-mesh bg-no-repeat bg-cover flex p-5 space-x-5 h-screen font-mono">
        <Sidebar />
        <div className="flex flex-col w-full space-y-5">
          <AdminMenu />
          <ListContinents />
        </div>
      </div>
    </Fragment>
  );
};

export default index;
