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
        <div id="share-popup" >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Dela ditt projekt</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>setShowPopup(false)}></button>
                    </div>
                    <div class="modal-body">
                        <p>Länk till ditt projekt:</p>
                        <p><a className="text-dark" href={shareURL}>{shareURL}</a></p>
                        <form id="email-share-form" onSubmit={handleSubmit}>
                            <label for="email" className="mt-4">Maila ditt projekt till någon</label>
                            <div class="input-group">
                                <input id="email" type="email" class="form-control" name="email"></input>
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