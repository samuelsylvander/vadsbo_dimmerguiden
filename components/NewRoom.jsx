import React, {useEffect, useState} from "react";
import Quantity from "./Quantity";
import SwitchButtons from "./SwitchButtons";
import Text from "./Text";
import TypeTable from "./TypeTable";


function NewRoom(props) {
    let newRoom;
    if (props.initialise.name = "") {
        newRoom = blankRoom
    } else {
        newRoom = props.initialise
    }
    const [roomDetails, setRoomDetails] = useState(newRoom);
    const [error, setError] = useState([]);

    function saveRoom() {
        if (checkDetails()) {
            props.setRoomList(prevVal => [...prevVal, roomDetails])
            props.setAppState("summary")
        }
    }

    function checkDetails() {
        for (let prop in roomDetails) {
            if (roomDetails[prop] == "") {
                setError(prop)
                return false;
            };
        };
        return true;
    }

    return (
    <div className="container">
        <h1>Add a new room</h1>
        
        <TypeTable 
            property="icon"
            error={error}
            setRoomDetails={setRoomDetails}
        />

        <Text 
            property="name" 
            error={error}
            roomDetails={roomDetails}
            setRoomDetails={setRoomDetails} 
            label="Room Name"
        />

        <Quantity 
            property="lights"
            roomDetails={roomDetails}
            setRoomDetails={setRoomDetails} 
            label="Lights" 
        />

        <SwitchButtons 
            error={error}
            property="app"
            setRoomDetails={setRoomDetails} 
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
                <button className="button btn-dark" onClick={saveRoom}>Save Room</button>
                <button className="button btn-dark" onClick={() => props.setAppState("newroom2")}>More Options</button>
        </p>

        <p>{JSON.stringify(roomDetails)}</p>

    </div>
    )
};

export default NewRoom;