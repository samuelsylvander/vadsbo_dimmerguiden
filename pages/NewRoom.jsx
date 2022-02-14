import React, {useState} from "react";
import Quantity from "./Quantity";
import SwitchButtons from "./SwitchButtons";
import Text from "./Text";
import TypeTable from "./TypeTable"


function NewRoom(props) {
    const blankRoom = {"room": "", "icon": "", "lights": 3, "switches": 1, "app": false}
    const [roomDetails, setRoomDetails] = useState(blankRoom);

    function saveRoom(event) {
        props.setAppState("newroom2");
        event.preventDefault();
    }

    return (
    <div className="container">
        <h1>Add a new room</h1>
        
        <TypeTable 
            property="room" 
            setRoomType={setRoomDetails}
        />

        <Text 
            property="name" 
            setRoomName={setRoomDetails} 
            label="Room Name"
        />

        <Quantity 
            property="lights"
            roomDetails={roomDetails}
            setRoomDetails={setRoomDetails} 
            label="Lights" 
        />

        <SwitchButtons 
            property="app"
            setRoomApp={setRoomDetails} 
            label="How do you want to control the lights?" 
            field={["App", "Switch"]} 
        />

        <Quantity 
            property="switches"
            roomDetails={roomDetails}
            setRoomDetails={setRoomDetails} 
            label="Switches" 
        />

        <p>
                <button className="button btn-dark" onClick={() => props.setAppState("summary")}>Save Room</button>
                <button className="button btn-dark" onClick={() => props.setAppState("newroom2")}>More Options</button>
        </p>

    </div>
    )
};

export default NewRoom;