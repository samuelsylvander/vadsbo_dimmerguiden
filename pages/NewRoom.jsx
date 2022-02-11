import React from "react";
import Quantity from "./Quantity";
import Switch from "./Switch";
import Text from "./Text";
import TypeTable from "./TypeTable"

function NewRoom(props) {

    function saveRoom(event) {
        props.setAppState("newroom2");
        event.preventDefault();
    }

    return (
    <div className="container">
        <h1>Add a new room</h1>
        
        <TypeTable />

        <Text />

        <Quantity field="Lights" />

        <Switch field="switch-type" />

        <Quantity field="Switches" />

    </div>
    )
};

export default NewRoom;