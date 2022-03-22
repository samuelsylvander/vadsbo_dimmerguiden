import React, { useEffect } from "react";
import "../styles/custom_theme.scss";


export default function App({ Component, pageProps }) {

    return (
        <Component {...pageProps} />
    ) 
}