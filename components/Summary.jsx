import React, { useEffect, useState, useRef } from "react";
import RoomQuantity from "./RoomQuantity";
import OptionsList from "./OptionsList";
import Sidebar from "./Sidebar";
import Share from "./SharePopup";

export default function Summary(props) {
    const [showPopup, setShowPopup] = useState(false)
    const shareURL = `localhost:3000/${props.projectId}`
    const toast = useRef();
   
    function checkOptions() {
        if (Object.keys(props.options).some(key=>props.options[key] == "Ja")) {
            return true
        } else {
            return false
        }
    };

    function handleDelete() {

    }

    async function saveProject() {
        toast.current.show();
        const url = "http://localhost:3000/api/savetodbAPI"
        const request = new XMLHttpRequest();
        request.open("POST", url, true);
        request.onreadystatechange = ()=> {
            if (request.readyState == 4 && request.status == 200) {
                console.log("server response: " + request.response);
            }
        }
        request.send(JSON.stringify({id: props.projectId, projectName: props.projectName, roomList: props.roomList, options: props.options}));
    }

    useEffect(()=> {
        var bootstrap = require('bootstrap')
        const saveToast = document.getElementById('saveToast')
        toast.current = new bootstrap.Toast(saveToast)
    }, [])

    useEffect(()=> saveProject(), [props.roomList]) //save project every time we change the roomList

    return (
        <div className="container row h-100">
            <div className="col-8 overflow-auto">
                <h1 className="mt-5">{props.projectName}</h1>
                {props.roomList.map((item, index) => {
                    return (
                        <RoomQuantity
                            key={item.name + index}
                            label={item.name} 
                            index={index} 
                            roomList={props.roomList} 
                            setRoomList={props.setRoomList} 
                            loadRoom={props.loadRoom} 
                            deleteRoom={handleDelete} 
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
                    <button className="btn btn-dark mx-3" data-bs-toggle="modal" data-bs-target="#confirmDelete">Modal</button>
                </div>
                
            </div>

            <div id="basket" style={{background: "rgba(0,0,0,0.7)"}} className="col-4 m-0 p-0">
                <Sidebar 
                    roomList={props.roomList} 
                    setAppState={props.setAppState}
                    options={props.options}
                />
            </div>

            <div className="position-fixed bottom-0 end-0 p-3" style={{"zIndex": 11}}>
                <div id="saveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="1500">
                    <div className="d-flex">
                        <div className="toast-body">
                            Project Saved!
                        </div>
                        <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                </div>
            </div>


            <div className="modal fade" id="confirmDelete" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="confirmDeleteLabel">Are you sure you want to delete?</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            This action cannot be undone.
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary"onClick={props.deleteRoom}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>


            {showPopup && <Share
                shareURL={shareURL}
                setShowPopup={setShowPopup}
            />}

            {/* display roomList for debugging {"Currently in Project: " + JSON.stringify(props.roomList)} */}

            
        </div>
    )
};