import Head from 'next/head'
import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import Image from 'next/image';
import phoneAppPic from "../public/phone-app.png"
import { useRouter } from 'next/router';
import Header from '../components/Header';



export default function Home() {
	const [projectName, setProjectName] = useState("");
    const [buttonText, setButtonText] = useState("Start Project");
    const router = useRouter();

	function handleUpdate(event) {
		let name = event.target.value;
        setProjectName(name);
	}

    async function newProject(event) {
        // set loading animation
        event.preventDefault();
        event.target.disabled = true;
        const newText = 
            <span>
                Skapar projekt
                <div className="d-flex align-items-center">
                    Laddar...
                    <div className="spinner-border spinner-border-sm ms-auto" role="status" aria-hidden="true"></div>
                </div>
            </span>
        setButtonText(newText)

        //start working
        const url = "http://localhost:3000/api/savetodbAPI"
        await fetch(url, {
            method: "POST",
            body: JSON.stringify({projectName: projectName, roomList: [], options: {}})
        })
            .then(response => response.json())
            .then(response => {
                console.log("database response: " + JSON.stringify(response))
                router.push("./" + response.insertedId);
            })
            .catch(error => console.log("database error: " + error));
    }

	return (
		<>
            <Head> 
                <title>Vadsbo dimmerGuiden&trade;</title>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                <link rel="manifest" href="/site.webmanifest"></link>
            </Head>
            <Header/>
            <div className="w-50 vh-100 pt-5 mx-auto">
                <div id="spacer" className="my-5"></div>
                <div className="row">

                    <div className="col-6 p-5">
                        <h2>Välkommen till dimmerGuiden™</h2>
                        <p>Produkterna vi utvecklar är riktade till dig som vill lösa din installation på ett enkelt och praktiskt sätt. I dimmerGuiden™ har vi samlat våra produkter (som fanns 2015 alltså), mätningar och tekniska framsteg i form av förklaringar kring dimring och installationsförfarande. dimmerGuiden™ innehåller enkla tips på hur du lyckas med din installation.</p>
                    </div>

                    <div className="col-6 mb-4">
                        <Image src={phoneAppPic} alt="En telefon som använder dimmerguiden&trade;" />
                    </div>

                </div>

                <div className="row align-items-center">

                    <div className="col-6 bg-primary p-4">
                        <h2 className="text-center mb-4">Starta guiden här</h2>
                        <label htmlFor="start-project">
                            Ge ditt projekt ett passande namn<br/>
                            <input id="start-project" className="form-control mt-2 bg-white" type="text" value={projectName} onChange={handleUpdate} placeholder="Ex. Storgatan 8" />
                        </label>
                        <button className="btn btn-dark mt-3" type="button" onClick={newProject}>{buttonText}</button>
                    </div>

                    <div className="col-6">
                        <p><FontAwesomeIcon icon={faCheck} className="text-info me-2"/> Du får en klar överblick</p>
                        <p><FontAwesomeIcon icon={faCheck} className="text-info me-2" /> En tydlig plocklista att ge till din grossist</p>
                        <p><FontAwesomeIcon icon={faCheck} className="text-info me-2" /> Ytterligare en motiverande USP</p>
                    </div>

                </div>

            </div>
		</>
    )
};