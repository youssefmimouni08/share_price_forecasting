import Head from "next/head";
import React, { Fragment, useEffect } from "react";
import Form from "../components/Form";
import Header from "../components/Header";
import List from "../components/list";
import styles from "../styles/Home.module.css";
import { useSelector } from "react-redux";

const history = () => {
  return (
    <div className="bg-mesh bg-no-repeat bg-cover h-screen">
      <Head>
        <title>my-app</title>
        <link rel="icon" href="/favicon.ico"></link>
        <script src="../path/to/datatables.min.js"></script>
      </Head>
      <Header />
      <List />
    </div>
  );
};

export default history;
