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



export default function Home(props) {
	const [projectName, setProjectName] = useState("");
    const router = useRouter();

	function handleUpdate(event) {
		let name = event.target.value;
        setProjectName(name);
	}

    async function newProject() {
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
        request.send(JSON.stringify({projectName: projectName, roomList: []}));
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
                    <button className="button btn-dark" type="button" onClick={newProject}>Start Project</button>
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