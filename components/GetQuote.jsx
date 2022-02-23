import React, { useEffect } from "react";

function GetQuote(props) {

    useEffect( ()=> {
        let paths = document.getElementsByTagName("path");
        for (let i=0; i<paths.length; i++) {
            paths[i].addEventListener("click", (event)=> {
                for (let j=0; j<paths.length; j++) {paths[j].style.fill="#7c7c7c"};
                event.target.style.fill="yellow";
            })
        };
    }, [])

    return (
        <div className="container">
            <div className="text-center">
                <h1>Get a Quote</h1>
            </div>
            <div className="row">
                <div className="col-6 m-auto">
                    <form>
                        <label>Your Name<br/>
                            <input type="text" />
                        </label>
                        <br/>
                        <label>Phone Number<br/>
                            <input type="phone" />
                        </label>
                        <br/>
                        <label>Email Address<br/>
                            <input type="email" />
                        </label>
                        <br/>
                        <label>Additional Information<br/>
                            <textarea />
                        </label>
                        <br/>
                        <button className="button btn-dark" type="submit">Submit Request</button>
                    </form>
                        <button className="button btn-dark" type="button" onClick={()=> props.setAppState("summary")}>Go Back</button>
                </div>
            </div>
        </div>
    )
};

export default GetQuote;