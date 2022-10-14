import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { NearProvider } from "../hooks/useNearProvider";
import Header from "../components/Common/Header";
import Head from "../components/Common/Head";

import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NearProvider>
      <Head />

      <div className="min-h-screen bg-test pb-1 lg:pb-0">
        <Header />

        <Component {...pageProps} />
      </div>
    </NearProvider>
  );
}

export default MyApp;
