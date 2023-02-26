import Head from "next/head";

import { Fragment } from "react";

import Header from "../components/Header";

import styles from "../styles/Home.module.css";

import Landing from "../components/layout/Landing";

export default function Home() {
  return (
    <div className="bg-mesh bg-no-repeat bg-cover">
      <Head>
        <title>my-app</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <Header />
      <Landing />
    </div>
  );
}
