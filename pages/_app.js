import React, {useState} from "react";
import '../styles/custom_theme.scss';

export default function App({ Component, pageProps }) {

    return (
        <Component {...pageProps} className="overflow-hidden" />
    ) 
  }