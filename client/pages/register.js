import Head from "next/head";
import Image from "next/image";
import { Fragment } from "react";

import Header from "../components/Header";
import LoginHero from "../components/layout/LoginHero";
import RegisterHero from "../components/layout/RegisterHero";

import styles from "../styles/Home.module.css";

export default function registerPage() {
  return (
    <div className="bg-mesh bg-no-repeat bg-cover">
      <Head>
        <title>my-app</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <Header />
      <RegisterHero />
    </div>
  );
}
