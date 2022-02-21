import React, {useState} from "react";
import Header from "../components/Header";
import '../styles/custom_theme.scss';

export default function App({ Component, pageProps }) {

    return (
      <div id="app">
        <Header />
        <Component {...pageProps} />
      </div>
    ) 
  }