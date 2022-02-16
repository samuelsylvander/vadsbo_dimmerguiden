import React from "react";
import RoomQuantity from "./RoomQuantity";

function Summary(props) {
    return (
        <div className="container">
            <h1>Summary</h1>
            {props.roomList.map((item, index) => <p><RoomQuantity label={item.name} index={index} roomList={props.roomList} setRoomList={props.setRoomList} /></p>)}
            <p>
                <button className="button btn-dark" onClick={() => props.setAppState("newroom1")}>Add Room</button>
                <button className="button btn-dark" onClick={() => props.setAppState("moreoptions")}>More Options</button>
            </p>
            {JSON.stringify(props.roomList)}
        </div>
    )
};

export default Summary