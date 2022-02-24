import { useRouter } from "next/router";
import React, { useState } from "react";
import Popup from "./Popup.jsx"

function GetQuote(props) {
    const [submitted, setSubmitted] = useState(false);
    const router = useRouter();

    function handleSubmit(event) {
        setSubmitted(true);
        event.preventDefault();
    }
    
    return (
        <div className="container m-auto text-center">
            <h1>Get a Quote</h1>
            <form onSubmit={handleSubmit}>
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
                    <textarea name="additional" />
                </label>
                <br/>
                <button className="button btn-dark" type="submit">Submit Request</button>
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