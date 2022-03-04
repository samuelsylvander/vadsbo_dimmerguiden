import { useRouter } from "next/router";
import React, { useState } from "react";
import Popup from "./Popup.jsx";
import sendEmail from "../libs/sendemail.js";

function GetQuote(props) {
    const [submitted, setSubmitted] = useState(false);
    const [buttonText, setButtonText] = useState("Submit Request")
    const router = useRouter();

    async function handleSubmit(event) {
        //add loading animation
        const newButtonText = 
            <span>
                Skickar...
                <div class="spinner-border mx-2" role="status">
                    <span class="sr-only">Laddar...</span>
                </div>
            </span>
        setButtonText(newButtonText)

        //get to work
        event.preventDefault();
        const formdata = new FormData(document.getElementById("get-quote-form"));
        formdata.append("projectId", props.projectId);
        formdata.append("link", `localhost:3000/${props.projectId}`);
        const result = await sendEmail(formdata);
        if (result == "success") {
            setSubmitted(true);
        } else {
            console.log(result)
        }
    }
    
    return (
        <div className="container-fluid">
            <h1>Be om offert</h1>
            <form id="get-quote-form" name="get-quote" onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label for="name" class="form-label">Namn</label>
                    <input type="text" class="form-control bg-white" id="name" required />
                </div>
                <div class="mb-3">
                    <label for="phone" class="form-label">Telefon</label>
                    <input type="text" class="form-control bg-white" id="phone" required />
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">E-post</label>
                    <input type="email" class="form-control bg-white" id="email" required />
                </div>
                <div class="mb-3">
                    <label for="message" class="form-label">Övrig information</label>
                    <textarea class="form-control bg-white" id="message" name="message"></textarea>
                </div>

                <button className="btn btn-outline-dark me-2" type="button" onClick={()=> props.setAppState("summary")}>Avbryt</button>
                <button className="btn btn-dark" type="submit">Skicka</button>
            </form>

            {submitted && <Popup 
                title="Tack för din förfrågan!"
                body="Ditt projekt har skickats till oss och en av våra representanter kommer att kontakta dig inom kort."
                confirm={["Tillbaka till projektet", ()=>props.setAppState("summary")]}
                dismiss={["Vidare till vadsbo.net", ()=>router.push("https://www.vadsbo.net")]}
            />}
        </div>
    )
};

export default GetQuote;