import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import vadsboLogo from '../public/logo_Vadsbo_2018_RGB.png';
import Image from "next/image";

function Header(props) {
    const url = `localhost:3000/${props.projectId}`;
    const body = <>Dit projekts ID: {props.projectId}<br />Spara adressen till ditt projekt:<br/>{url}</>

    function copyURL() {
        navigator.clipboard.writeText(url);
        const popup = document.getElementById("project-url");
        popup.style.display = "block";
        setTimeout(()=>popup.style.display = "none", 2000);
    }


    return (
        <nav className="navbar bg-primary">
            <div class="container-md">
                <div className="navbar-brand">
                    <Image src={vadsboLogo} height={60} width={292} alt="Vadsbo Logo" />
                </div>
                <h2>dimmerGuiden&#8482;</h2>
                {props.projectId && <div className="d-flex" onClick={copyURL}>
                    <FontAwesomeIcon className="mx-3" icon={faLink} />
                    <div id="project-url" style={{display: "none"}} className="bg-info position-absolute p-2">Adressen till projektet har kopierats</div>  
                </div>}
            </div>
        </nav>
    )
}

export default Header;