import Head from "next/head";
import React, { Fragment, useEffect } from "react";
import Form from "../components/Form";
import axios from "axios";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";
import { connect, useSelector } from "react-redux";
import Landing from "../components/layout/Landing";
const Forecast = () => {
  return (
    <div className="bg-mesh bg-cover h-screen">
      <Head>
        <title>my-app</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <Header />
      <Landing />
    </div>
  );
};

export default Forecast;
