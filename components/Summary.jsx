import React from "react";
import RoomQuantity from "./RoomQuantity";

function Summary(props) {
    return (
        <div className="container">
            <h1>Summary</h1>
            {props.roomList.map((item, index) => <RoomQuantity label={item.name} index={index} roomList={props.roomList} setRoomList={props.setRoomList} loadRoom={props.loadRoom} deleteRoom={props.deleteRoom} />)}
            <button className="button btn-dark" onClick={props.addRoom}>Add Room</button>
            <button className="button btn-dark" onClick={() => props.setAppState("moreoptions")}>More Options</button>
            <br/>
            <br/>
            <button className="button btn-dark" onClick={props.saveProject}>Save Project</button>

            {/* display roomList for debugging {"Currently in Project: " + JSON.stringify(props.roomList)} */}
        </div>
    )
};

export default Summary