import React, { useEffect, useState } from "react";
import Quantity from "./Quantity";
import SwitchButtons from "./SwitchButtons";
import Text from "./Text";

// props required:
// currentRoom - values to display/set
// setCurrentRoom - function to update currentRoom
// project - name of project to display
// setRoom - function to submit details
// error - array containing missing fields


function NewRoom(props) {
    const [step, setStep] = useState(0);

    useEffect( ()=> {
        if (props.currentRoom.switches > 0 || props.currentRoom.app == "App") {
            setStep(5)
        } else if (props.currentRoom.app != "") {
            setStep(4)
        } else if (props.currentRoom.group != "") {
            setStep(3)
        } else if (props.currentRoom.lights > 0) {
            setStep(2)
        } else if (props.currentRoom.name != "" && props.currentRoom.dali != "") {
            setStep(1);
        }
    }, [props.currentRoom]);

    return (
    <div className="container-fluid text-center">
        <h1 className="pt-4">Lägg till ett rum</h1>
        
        <Text 
            property="name" 
            currentRoom={props.currentRoom}
            setCurrentRoom={props.setCurrentRoom} 
            label="Lägg till nytt rum"
            infoText="Välj ett passande namn till rummet."
        />

        <SwitchButtons
            property="dali" 
            currentRoom={props.currentRoom}
            setCurrentRoom={props.setCurrentRoom} 
            label="Vad vill du styra?"
            field={["DALI", "DALI TW", "DALI RGB"]}
            infoText="Info text here"
        />

        
        {step > 0 && <Quantity 
            property="lights"
            currentRoom={props.currentRoom}
            setCurrentRoom={props.setCurrentRoom} 
            label="Lights" 
            // infoText="Info text here"
        />}

        {step > 1 && <SwitchButtons 
            property="group"
            currentRoom={props.currentRoom}
            setCurrentRoom={props.setCurrentRoom} 
            label="Vill du styra armaturerna ihop eller individuellt?" 
            field={["Ihop", "Individuellt"]} 
            infoText="Info text here"
        />}

        {step > 2 && <SwitchButtons 
            property="app"
            currentRoom={props.currentRoom}
            setCurrentRoom={props.setCurrentRoom} 
            label="Vill du styra med app (t ex tidstyrt) eller knapp?" 
            field={["App", "Knapp"]} 
            infoText="Info text here"
        />}

        {props.currentRoom.app == "Knapp" && <Quantity 
            property="switches"
            currentRoom={props.currentRoom}
            setCurrentRoom={props.setCurrentRoom} 
            label="Switches" 
            // infoText="Info text here"
        />}

        {step > 4 && <button className="button btn-dark" onClick={props.saveRoom}>Spara rum</button>}
      
        {/* display currentRoom contents for debugging */}
        {/* <p>{JSON.stringify(props.currentRoom)}</p> */}

    </div>
    )
};

export default NewRoom;