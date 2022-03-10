import { useRouter } from "next/router";
import React from "react";
import sendEmail from "../libs/sendemail.js";

function GetQuote(props) {
    const router = useRouter();

    async function handleSubmit(event) {
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
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Namn</label>
                    <input type="text" className="form-control bg-white" id="name" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Telefon</label>
                    <input type="text" className="form-control bg-white" id="phone" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">E-post</label>
                    <input type="email" className="form-control bg-white" id="email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="message" className="form-label">Övrig information</label>
                    <textarea className="form-control bg-white" id="message" name="message"></textarea>
                </div>
                <div className="mb-3">
                    <input type="checkbox" className="form-check-input me-2" id="acceptpolicy" name="acceptpolicy" />
                    <label htmlFor="acceptpolicy" className="form-label">
                        Accept our <a href="https://www.vadsbo.net/integritetspolicy/" target="_blank" className="text-black">privacy policy</a>
                    </label>
                </div>

                <button className="btn btn-outline-dark me-2" type="button" onClick={()=> props.setAppState("summary")}>Avbryt</button>
                <button className="btn btn-dark" type="submit">Skicka</button>
            </form>
        </div>
    )
};

export default GetQuote;