import Head from "next/head";
import Image from "next/image";
import logo from "../../public/Bulge.svg";
import loadingLogo from "../../public/Bulge.gif"
import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Player, Rankings, Teams } from "@/typings/types";
import Link from "next/link";


export default function Home() {
  
  return (
    <>
      <Head>
        <title>The Bulge Open</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Pochaevsk&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
      </Head>
      <div className="main">
        <Link href="/">
          <Image
            src={logo}
            alt="logo"
            width={200}
            height={200}
            priority
            className="mt-4"
          />
        </Link>
        <div className="content">
          <div className="mx-auto mt-5">
            <Link href="/registration"
            >
              <button className="btn-primary w-100 mb-4"><strong>Register</strong></button>
            </Link>
            <Link href="/live-score"
            >
              <button className="btn-primary w-100 mb-4"><strong>Live Score</strong></button>
            </Link>
            <Link href="/rules"
            >
              <button className="btn-primary w-100 mb-4"><strong>Rules</strong></button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
