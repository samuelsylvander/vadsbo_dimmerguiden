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
                <div className="spinner-border mx-2" role="status">
                    <span className="sr-only">Loading...</span>
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
        <div id="share-popup" >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Dela ditt projekt</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>setShowPopup(false)}></button>
                    </div>
                    <div className="modal-body">
                        <p>Länk till ditt projekt:</p>
                        <p><a className="text-dark" href={shareURL}>{shareURL}</a></p>
                        <form id="email-share-form" onSubmit={handleSubmit}>
                            <label for="email" className="mt-4">Maila ditt projekt till någon</label>
                            <div className="input-group">
                                <input id="email" type="email" className="form-control" name="email"></input>
                                <button type="submit" className="btn btn-dark">{emailText}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Share