import Head from 'next/head'
import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import Image from 'next/image';
import phoneAppPic from "../public/phone-app.png"
import { useRouter } from 'next/router';
import Header from '../components/Header';



export default function Home(props) {
	const [projectName, setProjectName] = useState("");
    const [buttonText, setButtonText] = useState("Start Project");
    const router = useRouter();

	function handleUpdate(event) {
		let name = event.target.value;
        setProjectName(name);
	}

    async function newProject(event) {
        // set loading animation
        event.target.disabled = true;
        const newText = 
            <span>
                Skapar projekt
                <div class="d-flex align-items-center">
                    Laddar...
                    <div class="spinner-border spinner-border-sm ms-auto" role="status" aria-hidden="true"></div>
                </div>
            </span>
        setButtonText(newText)

        //start working
        const url = "http://localhost:3000/api/savetodbAPI"
        const request = new XMLHttpRequest();
        request.open("POST", url, true);
        request.onreadystatechange = ()=> {
            if (request.readyState == 4 && request.status == 200) {
                console.log("server response: " + request.response);
                const url = "./" + JSON.parse(request.response).insertedId;
                router.push(url)
              }
        }
        request.send(JSON.stringify({projectName: projectName, roomList: [], options: {}}));
    }

	return (
		<>
            <Head> 
                <title>Vadsbo dimmerGuiden&trade;</title>
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
                        <label for="start-project">
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