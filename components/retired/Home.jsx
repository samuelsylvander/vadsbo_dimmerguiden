import React, { useEffect, useState } from "react";
import Image from "next/image";
import phoneAppPic from "../public/phone-app.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function Home(props) {
    
    function handleUpdate(event) {
        let name = event.target.value;
        props.setProject(name);
    }

    return (
        <div className="container">

            <div className="row">

                <div className="col-6 p-5">
                    <h4>Välkommen till dimmerGuiden™</h4>
                    <p>Produkterna vi utvecklar är riktade till dig som 
                    vill lösa din installation på ett enkelt och praktiskt 
                    sätt. I dimmerGuiden™ har vi samlat våra produkter 
                    (som fanns 2015 alltså), mätningar och tekniska 
                    framsteg i form av förklaringar kring dimring och 
                    installationsförfarande. dimmerGuiden™ innehåller 
                    enkla tips på hur du lyckas med din installation.</p>
                </div>

                <div className="col-6">
                    <Image src={phoneAppPic} alt="A Phone using the Vadsbo App" />
                </div>

            </div>

            <div className="row">

                <div className="col-6 bg-primary p-4 m-3">
                    <form onSubmit={props.newProject}>
                    <h3>Start Planning</h3>
                    <label>
                        Project Name<br/>
                        <input id="start-project" type="text" value={props.project} onChange={handleUpdate} placeholder="Give your project a name" required />
                    </label>
                    <br/>
                    <button className="button btn-dark" type="submit">Start Project</button>
                    </form>
                </div>

                <div className="col py-3">
                    <br />
                    <p><FontAwesomeIcon icon={faCheck} /> Du får en klar överblick</p>
                    <p><FontAwesomeIcon icon={faCheck} /> En tydlig plocklista att ge till din grossist</p>
                    <p><FontAwesomeIcon icon={faCheck} /> Ytterligare en motiverande USP</p>
                </div>

            </div>

        </div>
    )
};

export default Home