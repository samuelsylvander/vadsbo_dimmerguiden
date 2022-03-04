import React, { useEffect, useState } from "react";
import RoomQuantity from "./RoomQuantity";
import OptionsList from "./OptionsList";
import Sidebar from "./Sidebar";
import Share from "./SharePopup";

export default function Summary(props) {
    const [buttonText, setButtonText] = useState("Spara projekt");
    const [showPopup, setShowPopup] = useState(false)
    const shareURL = `localhost:3000/${props.projectId}`;

   
    function checkOptions() {
        if (Object.keys(props.options).some(key=>props.options[key] == "Ja")) {
            return true
        } else {
            return false
        }
    };

    async function saveProject() {
        //display animation
        const newButtonText =
        <div class="d-flex align-items-center">
            Laddar...
            <div class="spinner-border spinner-border-sm ms-auto" role="status" aria-hidden="true"></div>
        </div>
        setButtonText(newButtonText)

        const url = "http://localhost:3000/api/savetodbAPI"
        const request = new XMLHttpRequest();
        request.open("POST", url, true);
        request.onreadystatechange = ()=> {
            if (request.readyState == 4 && request.status == 200) {
                console.log("server response: " + request.response);
                setButtonText("Spara")
            }
        }
        request.send(JSON.stringify({id: props.projectId, projectName: props.projectName, roomList: props.roomList, options: props.options}));
    }

    useEffect( ()=> {
        setButtonText("Spara projekt") //reset save button text every time roomList changes
    }, [props.roomList]);

    useEffect(saveProject, []); //save project every time we enter summary page

    return (
        <div className="container row h-100">
            <div className="col-8 overflow-auto">
                <h1 className="mt-5">Projektnamn</h1>
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
                    label="Tillval" 
                    options={props.options} 
                    setOptions={props.setOptions} 
                    edit={()=> props.setAppState("moreoptions")}
                    delete={()=> props.setOptions({ipad: "", ipadnum: 0, battery: "", starter: ""})}
                />}

                <div className="py-5">
                    <button className="btn btn-dark mx-3" onClick={props.addRoom}>Lägg till rum</button>
                    <button className="btn btn-dark mx-3" onClick={() => props.setAppState("moreoptions")}>Tillval</button>
                    <button className="btn btn-dark mx-3" onClick={()=>setShowPopup(true)}>Dela</button>
                    <button className="btn btn-outline-dark mx-3" onClick={saveProject}>{buttonText}</button>
                </div>
                
            </div>

            <div id="basket" style={{background: "rgba(0,0,0,0.7)"}} className="col-4 m-0 p-0">
                <Sidebar 
                    roomList={props.roomList} 
                    setAppState={props.setAppState}
                    options={props.options}
                />
            </div>

            {showPopup && <Share
                shareURL={shareURL}
                setShowPopup={setShowPopup}
            />}

            {/* display roomList for debugging {"Currently in Project: " + JSON.stringify(props.roomList)} */}

            
        </div>
    )
};