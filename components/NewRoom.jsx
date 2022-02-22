import React from "react";
import Quantity from "./Quantity";
import SwitchButtons from "./SwitchButtons";
import Text from "./Text";
import TypeTable from "./TypeTable";

// props required:
// currentRoom - values to display/set
// setCurrentRoom - function to update currentRoom
// project - name of project to display
// setRoom - function to submit details
// error - array containing missing fields


function NewRoom(props) {
    return (
    <div className="container">
        <h1>Add a new room to {props.projectName}</h1>
        
        <Text 
            property="name" 
            error={props.error}
            currentRoom={props.currentRoom}
            setCurrentRoom={props.setCurrentRoom} 
            label="Room Name"
        />

        <SwitchButtons 
            error={props.error}
            property="dali"
            currentRoom={props.currentRoom}
            setCurrentRoom={props.setCurrentRoom} 
            label="Vad vill du styra?" 
            field={["Dali", "Dali TW", "Dali RGB"]} 
        />

        
        <Quantity 
            property="lights"
            currentRoom={props.currentRoom}
            setCurrentRoom={props.setCurrentRoom} 
            label="Lights" 
        />

        <SwitchButtons 
            error={props.error}
            property="group"
            currentRoom={props.currentRoom}
            setCurrentRoom={props.setCurrentRoom} 
            label="Vill du styra armaturerna ihop eller individuellt?" 
            field={["ihop", "individuellt"]} 
        />

        <SwitchButtons 
            error={props.error}
            property="app"
            currentRoom={props.currentRoom}
            setCurrentRoom={props.setCurrentRoom} 
            label="Vill du styra med app (t ex tidstyrt) eller knapp?" 
            field={["App", "Switch"]} 
        />

        <Quantity 
            property="switches"
            currentRoom={props.currentRoom}
            setCurrentRoom={props.setCurrentRoom} 
            label="Switches" 
        />

        <button className="button btn-dark" onClick={props.saveRoom}>Save Room</button>
      
        {/* display currentRoom contents for debugging */}
        <p>{JSON.stringify(props.currentRoom)}</p>

    </div>
    )
};

export default NewRoom;