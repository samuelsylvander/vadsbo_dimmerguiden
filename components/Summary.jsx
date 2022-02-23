import React from "react";
import RoomQuantity from "./RoomQuantity";
import OptionsList from "./OptionsList";
import Sidebar from "./Sidebar";

export default function Summary(props) {
    function checkOptions() {
        if (props.options.ipad == "Ya" || props.options.battery == "Ya" || props.options.starter == "Ya") {
            return true
        } else {
            return false
        }
    };
    return (
        <div className="container row m-0 p-0 h-100 w-100">
            <div className="col-8 h-100 px-6 overflow-auto">
                <h1 className="mt-5">Summary</h1>
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

                <div className="py-5">
                    <button className="button btn-dark mx-3" onClick={props.addRoom}>Add Room</button>
                    <button className="button btn-dark mx-3" onClick={() => props.setAppState("moreoptions")}>More Options</button>
                    <br/>
                    <br/>
                    <button className="button btn-dark mx-3" onClick={props.saveProject}>Save Project</button>
                </div>
                
            </div>
            
            <div id="basket" style={{background: "rgba(0,0,0,0.7)"}} className="col-4 m-0 p-0">
                <Sidebar 
                    roomList={props.roomList} 
                    setAppState={props.setAppState}
                />
            </div>


            {/* display roomList for debugging {"Currently in Project: " + JSON.stringify(props.roomList)} */}
        </div>
    )
};