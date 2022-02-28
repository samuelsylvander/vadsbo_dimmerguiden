import React, { useEffect, useState } from "react";
import sendEmail from "../libs/sendemail";

//props:
//title
//body 
//confirm [label, function]
//dismiss [label, function]

function Share({shareURL, setShowPopup}) {
    const [buttonText, setButtonText] = useState("Copy to Clipboard")
    const [emailText, setEmailText] = useState("Send Email")

    function copyURL() {
        navigator.clipboard.writeText(shareURL);
        setButtonText("Copied!")
    }

    async function handleSubmit(event) {
        //add loading animation
        const newButtonText = 
            <span>
                Sending...
                <div class="spinner-border mx-2" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </span>
        setEmailText(newButtonText)

        //get to work
        event.preventDefault();
        const formdata = new FormData(document.getElementById("email-share-form"));
        formdata.append("link", shareURL);
        const result = await sendEmail(formdata);
        if (result == "success") {
            setEmailText("Sent!")
        } else {
            console.log(result)
        }
    }

    return (
        <div id="share-popup" className="popup">
            <div className="popup-title">
                Share Your Project
            </div>
            <div className="popup-body">
                Access this project at:<br/><a className="text-dark" href={shareURL}>{shareURL}</a><br/>
                <form id="email-share-form" onSubmit={handleSubmit}>
                    <input type="email" name="email"></input>
                    <button type="submit" className="button">{emailText}</button>
                </form>
            </div>
            <div className="popup-buttons">
                <button className="button btn-dark" onClick={copyURL}>{buttonText}</button>
                <button className="button btn-dark" onClick={()=>setShowPopup(false)}>Close</button>
            </div>
        </div>
    )
}

export default Share