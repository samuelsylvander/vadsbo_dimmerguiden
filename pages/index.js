import Head from 'next/head'
import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import Image from 'next/image';
import phoneAppPic from "../public/phone-app.png"



export default function Home(props) {
	const [projectName, setProjectName] = useState("");

	function handleUpdate(event) {
		let name = event.target.value;
        setProjectName(name);
	}

	return (
		<>
		<Head> 
			<title>Vadsbo dimmerGuiden</title>
		</Head>
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
                    <h3>Start Planning</h3>
                    <label>
                        Project Name<br/>
                        <input id="start-project" type="text" value={projectName} onChange={handleUpdate} placeholder="Give your project a name" />
                    </label>
                    <br/>
                    <button className="button btn-dark" type="button" onClick={props.newProject}>Start Project</button>
                </div>

                <div className="col py-3">
                    <br />
                    <p><FontAwesomeIcon icon={faCheck} /> Du får en klar överblick</p>
                    <p><FontAwesomeIcon icon={faCheck} /> En tydlig plocklista att ge till din grossist</p>
                    <p><FontAwesomeIcon icon={faCheck} /> Ytterligare en motiverande USP</p>
                </div>

            </div>

        </div>
		</>
    )
};