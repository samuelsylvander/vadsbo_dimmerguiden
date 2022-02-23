import React from "react";
import RoomQuantity from "./RoomQuantity";
import OptionsList from "./OptionsList";

export default function Summary(props) {
    function checkOptions() {
        if (props.options.ipad == "Ya" || props.options.battery == "Ya" || props.options.starter == "Ya") {
            return true
        } else {
            return false
        }
    };
    return (
        <div className="container">
            <h1>Summary</h1>
            {props.roomList.map((item, index) => {
                return (
                    <RoomQuantity 
                        label={item.name} 
                        index={index} 
                        roomList={props.roomList} 
                        setRoomList={props.setRoomList} 
                        loadRoom={props.loadRoom} 
                        deleteRoom={props.deleteRoom} 
                    />
                )
            })}
            {checkOptions() && <OptionsList
                label="Options" 
                options={props.options} 
                setOptions={props.setOptions} 
                edit={()=> props.setAppState("moreoptions")}
                delete={()=> props.setOptions({ipad: "", ipadnum: 0, battery: "", starter: ""})}
            />}
            <button className="button btn-dark" onClick={props.addRoom}>Add Room</button>
            <button className="button btn-dark" onClick={() => props.setAppState("moreoptions")}>More Options</button>
            <br/>
            <br/>
            <button className="button btn-dark" onClick={props.saveProject}>Save Project</button>

            {/* display roomList for debugging {"Currently in Project: " + JSON.stringify(props.roomList)} */}
        </div>
    )
};