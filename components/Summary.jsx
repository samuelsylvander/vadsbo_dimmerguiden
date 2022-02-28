import React, { useEffect, useState } from "react";
import RoomQuantity from "./RoomQuantity";
import OptionsList from "./OptionsList";
import Sidebar from "./Sidebar";

export default function Summary(props) {
    const [buttonText, setButtonText] = useState("Save Project");

    function checkOptions() {
        if (props.options.ipad == "Ya" || props.options.battery == "Ya" || props.options.starter == "Ya") {
            return true
        } else {
            return false
        }
    };

    async function saveProject() {
        //display animation
        const newButtonText =
            <span>
                Saving...
                <div class="spinner-border mx-2" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </span>
        setButtonText(newButtonText)

        const url = "http://localhost:3000/api/savetodbAPI"
        const request = new XMLHttpRequest();
        request.open("POST", url, true);
        request.onreadystatechange = ()=> {
            if (request.readyState == 4 && request.status == 200) {
                console.log("server response: " + request.response);
                setButtonText("Saved")
              }
        }
        request.send(JSON.stringify({id: props.projectId, projectName: props.projectName, roomList: props.roomList, options: props.options}));
    }

    useEffect( ()=> {
        setButtonText("Save Project")
    }, [props.roomList]);

    useEffect(saveProject, []); //save project every time we enter summary page

    return (
        <div className="container row m-0 p-0 h-100 w-100">
            <div className="col-8 h-100 px-6 overflow-auto">
                <h1 className="mt-5">Summary</h1>
                {props.roomList.map((item, index) => {
                    return (
                        <RoomQuantity
                            key={item.name + index}
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
                    <button className="button btn-dark mx-3" onClick={saveProject}>{buttonText}</button>
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