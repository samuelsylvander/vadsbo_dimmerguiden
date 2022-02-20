import React, { useEffect, useState } from "react";
import Image from "next/image";
import phoneAppPic from "../public/phone-app.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

    // props required:
    // project - name of current project
    // setProject - function to set "project"
    // setAppState - function to change current page in app
    // setRoomList - function used to import details from local storage or database
    // dbProjects - project details stored in database (currently unused)

function Home(props) {
    function handleUpdate(event) {
        let name = event.target.value;
        props.setProject(name);
    }

    function handleSubmit(event) {
        props.setAppState("newroom");
        event.preventDefault();
    };

    function loadProject(index) {
        props.setProject(props.projectList[index].projectName);
        props.setRoomList(props.projectList[index].roomList);
        props.setAppState("summary");
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
                    <form onSubmit={handleSubmit} >
                    <h3>Start Planning</h3>
                    <label>
                        Project Name<br/>
                        <input id="start-project" type="text" value={props.project} onChange={handleUpdate} placeholder="Give your project a name" />
                    </label>
                    <button className="button btn-dark" type="submit">Start Project</button>
                    </form>
                    {props.projectList.length > 0 && <><br /><h4>Or Load a Previous Project</h4></>}
                    {props.projectList.map((project, index) => <button key={project.projectName} className="button btn-dark" onClick={() => loadProject(index)}>{project.projectName}</button>)}
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