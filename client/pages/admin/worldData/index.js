import Head from "next/head";
import React, { Fragment } from "react";
import ViewWorld from "../../../components/layout/admin/ViewWorld";

const index = () => {
  return (
    <Fragment>
      <Head>
        <title>World Data | Admin dashboard</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <ViewWorld />
    </Fragment>
  );
};

export default index;
