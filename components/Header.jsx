import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import vadsboLogo from "../public/logo_Vadsbo_2018_RGB.png";
import Image from "next/image";

//this component could be deprecated easily

function Header({projectId, showToast}) {
    const url = `localhost:3000/${projectId}`;

    function copyURL() {
        navigator.clipboard.writeText(url);
        showToast("Link Copied to Clipboard")
    }

    return (
        <nav className="navbar bg-primary shadow-sm">
            <div className="container-md">
                <div className="navbar-brand">
                    <Image src={vadsboLogo} height={60} width={292} alt="Vadsbo Logo" />
                </div>
                <h2>dimmerGuiden&#8482;</h2>
                {projectId && <div id="copy-url" className="d-flex" onClick={copyURL}>
                    <FontAwesomeIcon className="mx-3" icon={faLink} />
                </div>}
            </div>
        </nav>
    )
}

export default Header;