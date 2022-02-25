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
                Submitting...
                <div class="spinner-border mx-2" role="status">
                    <span class="sr-only">Loading...</span>
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
        <div className="container m-auto text-center">
            <h1>Get a Quote</h1>
            <form id="get-quote-form" name="get-quote" onSubmit={handleSubmit}>
                <label>Your Name<br/>
                    <input name="name" type="text" />
                </label>
                <br/>
                <label>Phone Number<br/>
                    <input name="phone" type="phone" />
                </label>
                <br/>
                <label>Email Address<br/>
                    <input name="email" type="email" />
                </label>
                <br/>
                <label>Additional Information<br/>
                    <textarea name="message" />
                </label>
                <br/>
                <button className="button btn-dark" type="submit">{buttonText}</button>
            </form>
            <button className="button btn-dark" type="button" onClick={()=> props.setAppState("summary")}>Cancel</button>
            {submitted && <Popup 
                title="Thank you for your request"
                body="The details of your project have been submitted, and one of our representatives will be in touch with you very soon"
                confirm={["Return to Project", ()=>props.setAppState("summary")]}
                dismiss={["Go to vadsbo.net", ()=>router.push("https://www.vadsbo.net")]}
            />}
        </div>
    )
};

export default GetQuote;