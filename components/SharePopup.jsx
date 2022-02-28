import React, { useEffect, useState } from "react";

//props:
//title
//body 
//confirm [label, function]
//dismiss [label, function]

function Share({shareURL, setShowPopup}) {
    const [buttonText, setButtonText] = useState("Copy to Clipboard")

    function copyURL() {
        navigator.clipboard.writeText(shareURL);
        setButtonText("Copied!")
    }

    return (
        <div id="share-popup" className="popup">
            <div className="popup-title">
                Share Your Project
            </div>
            <div className="popup-body">
                Access this project at:<br/><a href={shareURL}>{shareURL}</a>
            </div>
            <div className="popup-buttons">
                <button className="button btn-dark" onClick={copyURL}>{buttonText}</button>
                <button className="button btn-dark" onClick={()=>setShowPopup(false)}>Close</button>
            </div>
        </div>
    )
}

export default Share