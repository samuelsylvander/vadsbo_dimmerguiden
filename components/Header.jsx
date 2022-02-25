import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import Popup from "./Popup";

function Header(props) {
    const url = `localhost:3000/${props.projectId}`;
    const [showPopup, setShowPopup] = useState(false)
    const body = <>Your project ID is: {props.projectId}<br />Access this project at:<br/>{url}</>

    function copyURL() {
        navigator.clipboard.writeText(url);
    }

    return (
        <nav className="navbar bg-primary position-fixed w-100">
            <span className="navbar-brand">Vadsbo</span>
            {props.projectId && <FontAwesomeIcon icon={faLink} onClick={()=>setShowPopup(true)} />}
            {showPopup && <Popup
                title="Share your project"
                body={body}
                confirm={["Copy to Clipboard", copyURL]}
                dismiss={["Close", ()=>setShowPopup(false)]}
            />}
        </nav>
    )
}

export default Header;