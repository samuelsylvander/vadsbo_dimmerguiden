import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

function Header(props) {
    const url = `localhost:3000/${props.projectId}`;
    const body = <>Your project ID is: {props.projectId}<br />Access this project at:<br/>{url}</>

    function copyURL() {
        navigator.clipboard.writeText(url);
        const popup = document.getElementById("project-url");
        popup.style.display = "block";
        setTimeout(()=>popup.style.display = "none", 2000);
    }


    return (
        <nav className="navbar bg-primary position-fixed w-100">
                <div className="col-auto px-3 me-auto">
                    <span className="navbar-brand">Vadsbo</span>
                </div>
                {props.projectId && <div className="col-1 text-center" onClick={copyURL}>
                    <FontAwesomeIcon className="mx-3" icon={faLink} />
                    <div id="project-url" style={{display: "none"}} className="bg-info position-absolute">URL Copied to Clipboard</div>  
                </div>}
         </nav>
    )
}

export default Header;