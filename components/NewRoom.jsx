import React from "react";
import Quantity from "./Quantity";
import SwitchButtons from "./SwitchButtons";
import Text from "./Text";
import TypeTable from "./TypeTable";

// props required:
// roomDetails - values to display/set
// setRoomDetails - function to update roomDetails
// project - name of project to display
// setRoom - function to submit details
// error - array containing missing fields


function NewRoom(props) {
    return (
    <div className="container">
        <h1>Add a new room to {props.project}</h1>
        
        <TypeTable 
            property="icon"
            error={props.error}
            roomDetails={props.roomDetails}
            setRoomDetails={props.setRoomDetails}
        />

        <Text 
            property="name" 
            error={props.error}
            roomDetails={props.roomDetails}
            setRoomDetails={props.setRoomDetails} 
            label="Room Name"
        />

        <Quantity 
            property="lights"
            roomDetails={props.roomDetails}
            setRoomDetails={props.setRoomDetails} 
            label="Lights" 
        />

        <SwitchButtons 
            error={props.error}
            property="app"
            roomDetails={props.roomDetails}
            setRoomDetails={props.setRoomDetails} 
            label="How do you want to control the lights?" 
            field={["App", "Switch"]} 
        />

        <Quantity 
            property="switches"
            roomDetails={props.roomDetails}
            setRoomDetails={props.setRoomDetails} 
            label="Switches" 
        />

        <button className="button btn-dark" onClick={props.saveRoom}>Save Room</button>
      
        {/* display roomDetails contents for debugging */}
        <p>{JSON.stringify(props.roomDetails)}</p>

    </div>
    )
};

export default NewRoom;