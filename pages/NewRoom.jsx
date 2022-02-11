import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney, faBuilding, faPhone } from "@fortawesome/free-solid-svg-icons";
import Quantity from "./Quantity";

function NewRoom() {
    return (
    <div className="container">
        <h1>Add a new room</h1>
        <h2>Type of room</h2>
        <FontAwesomeIcon icon={faHouseChimney} />
        <FontAwesomeIcon icon={faBuilding} />
        <FontAwesomeIcon icon={faPhone} />

        <label>
            Room name
            <input type="text" placeholder="Room name"></input>
        </label>

        

        <button className="btn btn-primary m-3">Button Primary</button>
        <Quantity />
    </div>
    )
};

export default NewRoom;