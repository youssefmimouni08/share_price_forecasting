import Head from "next/head";
import React, { Fragment, useEffect } from "react";
import Form from "../components/Form";
import axios from "axios";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";
import { connect, useSelector } from "react-redux";
const Forecast = () => {
  return (
    <Fragment>
      <Head>
        <title>my-app</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <Header />
      <Form />
    </Fragment>
  );
};

export default Forecast;
