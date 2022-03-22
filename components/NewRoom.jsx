//import React, { useEffect } from "react";
import Quantity from "./Quantity";
import SwitchButtons from "./SwitchButtons";
import Info from "./Info";
import daliLogo from "../public/dali-pictogram.png";
import daliRGBLogo from "../public/dali-rgb-pictogram.png";
import daliTWLogo from "../public/dali-tw-pictogram.png";
import Image from "next/image";

// props required:
// currentRoom - values to display/set
// setCurrentRoom - function to update currentRoom
// project - name of project to display
// setRoom - function to submit details
// error - array containing missing fields


function NewRoom(props) {
    const daliButtons = [
        <Image src={daliLogo} height={200} width={200} alt="DALI logo"/>,
        <Image src={daliTWLogo} height={200} width={200} alt="DALI TW logo"/>,
        <Image src={daliRGBLogo} height={200} width={200} alt="DALI RGB logo"/>
    ]

    return (
    <div className="container-fluid text-center">
        <h1 className="py-4">Lägg till ett rum</h1>
        
        <div className="row pt-4 justify-content-center">
            <div className="col-auto">
                <label>
                    <h3 className="d-inline-block mb-2">Ge rummet ett namn</h3>
                    <Info text={"Välj ett passande namn till rummet."} />
                    <input 
                        className="form-control bg-white" 
                        type="text" 
                        placeholder="T ex Kontor"
                        value={props.currentRoom["name"]} 
                        onChange={(event)=>props.setCurrentRoom(prevVal => ({...prevVal, name: event.target.value}))}
                        required 
                    />
                </label>
            </div>
        </div>

        <div className="row pt-4">
            <SwitchButtons
                property="dali" 
                currentRoom={props.currentRoom}
                setCurrentRoom={props.setCurrentRoom} 
                label="Vad vill du styra?"
                images={daliButtons}
                field={["DALI", "DALI TW", "DALI RGB"]}
                infoText="Info text here"
            />
        </div>

        <div id="step1" key={props.currentRoom.name} className={!(props.currentRoom.name != "" && props.currentRoom.dali != "") ? "visually-hidden-focusable": "row pt-4 justify-content-center"}>
            <Quantity 
                property="lights"
                currentRoom={props.currentRoom}
                setCurrentRoom={props.setCurrentRoom} 
                label="Antal armaturer" 
                // infoText="Info text here"
            />
        </div>

        <div id="step2" key={props.currentRoom.lights} className={!(props.currentRoom.lights > 0) ? "visually-hidden-focusable": "row pt-4 justify-content-center"}>
            <SwitchButtons 
                property="group"
                currentRoom={props.currentRoom}
                setCurrentRoom={props.setCurrentRoom} 
                label="Vill du styra armaturerna ihop eller individuellt?" 
                field={["Ihop", "Individuellt"]} 
                infoText="Info text here"
            />
        </div>

        <div id="step3" key={props.currentRoom.group} className={!(props.currentRoom.group != "") ? "visually-hidden-focusable": "row pt-4 justify-content-center"}>
            <SwitchButtons 
                property="app"
                currentRoom={props.currentRoom}
                setCurrentRoom={props.setCurrentRoom} 
                label="Vill du styra med app (t ex tidstyrt) eller knapp?" 
                field={["App", "Knapp"]} 
                infoText="Info text here"
            />

            {props.currentRoom.app == "Knapp" && <Quantity 
                property="switches"
                currentRoom={props.currentRoom}
                setCurrentRoom={props.setCurrentRoom} 
                label="Switches" 
                // infoText="Info text here"
            />}
        </div>

        <div id="step4" className={!(props.currentRoom.switches > 0 || props.currentRoom.app == "App") ? "visually-hidden-focusable": "row pt-4 justify-content-center"}>
            <button className="btn btn-lg btn-dark w-auto" onClick={props.saveRoom}>Spara rum</button>
        </div>

    </div>
    )
};

export default NewRoom;