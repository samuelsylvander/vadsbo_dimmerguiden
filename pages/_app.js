import React, { useEffect } from "react";
import '../styles/custom_theme.scss';


export default function App({ Component, pageProps }) {
    // useEffect(() => {
    //     import("bootstrap/dist/js/bootstrap");
    //   }, []);

    return (
        <Component {...pageProps} className="overflow-hidden" />
    ) 
  }