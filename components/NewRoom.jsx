import React, { useEffect } from "react";
import Quantity from "./Quantity";
import SwitchButtons from "./SwitchButtons";
import Info from "./Info";

// props required:
// currentRoom - values to display/set
// setCurrentRoom - function to update currentRoom
// project - name of project to display
// setRoom - function to submit details
// error - array containing missing fields


function NewRoom(props) {

    return (
    <div className="container-fluid text-center">
        <h1 className="pt-4">Lägg till ett rum</h1>
        
        <div className="container">
            <label>
                <h3 className="d-inline-block">Lägg till nytt rum</h3>
                <Info text={"Välj ett passande namn till rummet."} />
                <input 
                    className="fs-4" 
                    type="text" 
                    placeholder="Room name" 
                    value={props.currentRoom["name"]} 
                    onChange={(event)=>props.setCurrentRoom(prevVal => ({...prevVal, name: event.target.value}))}
                    required 
                />
            </label>
        </div>

        <SwitchButtons
            property="dali" 
            currentRoom={props.currentRoom}
            setCurrentRoom={props.setCurrentRoom} 
            label="Vad vill du styra?"
            field={["DALI", "DALI TW", "DALI RGB"]}
            infoText="Info text here"
        />

        <div id="step1" className={!(props.currentRoom.name != "" && props.currentRoom.dali != "") && "visually-hidden-focusable"}>
            <Quantity 
                property="lights"
                currentRoom={props.currentRoom}
                setCurrentRoom={props.setCurrentRoom} 
                label="Antal armaturer" 
                // infoText="Info text here"
            />
        </div>

        <div id="step2" className={!(props.currentRoom.lights > 0) && "visually-hidden-focusable"}>
            <SwitchButtons 
                property="group"
                currentRoom={props.currentRoom}
                setCurrentRoom={props.setCurrentRoom} 
                label="Vill du styra armaturerna ihop eller individuellt?" 
                field={["Ihop", "Individuellt"]} 
                infoText="Info text here"
            />
        </div>

        <div id="step3" className={!(props.currentRoom.group != "") && "visually-hidden-focusable"}>
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

        <div id="step4" className={!(props.currentRoom.switches > 0 || props.currentRoom.app == "App") && "visually-hidden-focusable"}>
            <button className="button btn-dark" onClick={props.saveRoom}>Spara rum</button>
        </div>

    </div>
    )
};

export default NewRoom;