import React, { useEffect, useState, useRef } from "react";
import RoomQuantity from "./RoomQuantity";
import OptionsList from "./OptionsList";
import Sidebar from "./Sidebar";
import sendEmail from "../libs/sendemail";

export default function Summary(props) {
    const shareURL = `localhost:3000/${props.projectId}`
    const toast = useRef();
    const quoteModal = useRef();
    const deleteModal = useRef();
    const shareModal = useRef();
    const detailsModal = useRef();
   

    function checkOptions() {
        if (Object.keys(props.options).some(key=>props.options[key] == "Ja")) {
            return true
        } else {
            return false
        }
    };

    function handleDelete(deleteIndex) {
        deleteModal.current.show();
        let deleteButton = document.getElementById("confirmDeleteButton")
        deleteButton.onclick = () => {
            props.deleteRoom(deleteIndex);
            deleteModal.current.hide()
        }
    }

    async function saveProject() {
        const url = "http://localhost:3000/api/savetodbAPI"
        await fetch(url, {
            method: "POST",
            body: JSON.stringify({id: props.projectId, projectName: props.projectName, roomList: props.roomList, options: props.options})
        })
            .then(response => response.json())
            .then(response=> {
                console.log("database response: " + JSON.stringify(response))
                showToast("Project Saved!")
            })
            .catch(error => console.log("database error: " + error));
        
    }

    async function handleGetQuote(event) {
        event.preventDefault();
        quoteModal.current.hide()
        const formdata = new FormData(document.getElementById("get-quote-form"));
        formdata.append("projectId", props.projectId);
        formdata.append("link", shareURL);
        const result = await sendEmail(formdata);
        if (result === "success") {
            showToast("Email Sent!")
        } else {
            showToast("An error occurred, please try again")
        }
    }

    async function handleShare(event) {
        event.preventDefault();
        shareModal.current.hide()
        const formdata = new FormData(document.getElementById("share-project-form"));
        formdata.append("projectId", props.projectId);
        formdata.append("link", `localhost:3000/${props.projectId}`);
        const result = await sendEmail(formdata);
        if (result === "success") {
            showToast("Email Sent!")
        } else {
            showToast("An error occurred, please try again")
        }
    }

    function showDetails(item) {
        document.getElementById("productDetailsHeader").innerText = item
        document.getElementById("productDetailsBody").innerText = "Details about " + item // add an object lookup for the details
        detailsModal.current.show()
    }

    function showToast(message) {
        document.getElementById("toastMessage").innerHTML = message;
        toast.current.show();
    }

    useEffect(()=> { //set up the references to the bootstrap toasts and modals
        var bootstrap = require('bootstrap')

        const toastAlert = document.getElementById('toastAlert')
        toast.current = new bootstrap.Toast(toastAlert)

        const quote = document.getElementById('getQuote')
        quoteModal.current = bootstrap.Modal.getOrCreateInstance(quote)
        const confirmDelete = document.getElementById('confirmDelete')
        deleteModal.current = bootstrap.Modal.getOrCreateInstance(confirmDelete)
        const shareProject = document.getElementById('shareProject')
        shareModal.current = bootstrap.Modal.getOrCreateInstance(shareProject)
        const productDetails = document.getElementById('productDetails')
        detailsModal.current = bootstrap.Modal.getOrCreateInstance(productDetails)

        // set event listener to show toast on clicking share icon in navbar
        document.getElementById("copy-url").addEventListener("click", ()=> showToast("Link copied to clipboard"))
    }, [])

    useEffect(()=> saveProject(), [props.roomList]) //save project every time we change the roomList

    useEffect(()=>{ //uncollapse the details if less than six items
        if (props.roomList.length <= 5) {
            let collapsable = document.getElementsByClassName("collapse");
            for (let i=0; i<collapsable.length; i++) {
                collapsable[i].className = "collapse show p-0"
            }
        }
    },[])


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
                    <button className="btn btn-dark mx-3" onClick={() => shareModal.current.show()}>Dela</button>
                </div>
                
            </div>

            <div id="basket" style={{background: "rgba(0,0,0,0.7)"}} className="col-4 m-0 p-0">
                <Sidebar 
                    roomList={props.roomList} 
                    setAppState={props.setAppState}
                    options={props.options}
                    showDetails={showDetails}
                />
            </div>

                    {/* Toast Alert */}
            <div className="position-fixed bottom-0 end-0 p-3" style={{"zIndex": 11}}>
                <div id="toastAlert" className="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="1500">
                    <div className="d-flex">
                        <div id="toastMessage" className="toast-body">
                            Project Saved!
                        </div>
                        <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                </div>
            </div>

            <div className="position-fixed bottom-0 end-0 p-3" style={{"zIndex": 11}}>
                <div id="copyLinkToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="1500">
                    <div className="d-flex">
                        <div className="toast-body">
                            Project Link Copied to Clipboard
                        </div>
                        <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                </div>
            </div>

                {/* Confirm Delete Modal */}
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
                            <button id="confirmDeleteButton" type="button" className="btn btn-primary">Delete</button>
                        </div>
                    </div>
                </div>
            </div>

                {/* Get Quote Modal */}
            <div className="modal fade" id="getQuote" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1>Be om offert</h1>
                        </div>
                    
                        <form id="get-quote-form" name="get-quote" onSubmit={handleGetQuote}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Namn</label>
                                    <input type="text" className="form-control bg-white" id="name" name="name" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Telefon</label>
                                    <input type="text" className="form-control bg-white" id="phone" name="phone" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">E-post</label>
                                    <input type="email" className="form-control bg-white" id="email" name="email" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message" className="form-label">Övrig information</label>
                                    <textarea className="form-control bg-white" id="message" name="message"></textarea>
                                </div>
                                <div className="mb-3">
                                    <input type="checkbox" className="form-check-input me-2" id="acceptpolicy" name="acceptpolicy" required />
                                    <label htmlFor="acceptpolicy" className="form-label">
                                        Accept our <a href="https://www.vadsbo.net/integritetspolicy/" target="_blank" className="text-black">privacy policy</a>
                                    </label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button id="dismissmodal" className="btn btn-outline-dark me-2" type="button" data-bs-dismiss="modal">Avbryt</button>
                                <button className="btn btn-dark" type="submit">Skicka</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

                {/* Share Project Modal */}
            <div className="modal fade" id="shareProject" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1>Be om offert</h1>
                        </div>
                    
                        <form id="share-project-form" name="share-project" onSubmit={handleShare}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Namn</label>
                                    <input type="text" className="form-control bg-white" id="name" name="name" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">E-post</label>
                                    <input type="email" className="form-control bg-white" id="email" name="email" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message" className="form-label">Övrig information</label>
                                    <textarea className="form-control bg-white" id="message" name="message" required ></textarea>
                                </div>
                                <div className="mb-3">
                                    <input type="checkbox" className="form-check-input me-2" id="acceptpolicy" name="acceptpolicy" required />
                                    <label htmlFor="acceptpolicy" className="form-label">
                                        Accept our <a href="https://www.vadsbo.net/integritetspolicy/" target="_blank" className="text-black">privacy policy</a>
                                    </label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button id="dismissmodal" className="btn btn-outline-dark me-2" type="button" data-bs-dismiss="modal">Avbryt</button>
                                <button className="btn btn-dark" type="submit">Skicka</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

                {/* Sidebar Product Info Modal */}
            <div className="modal fade" id="productDetails" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="productDetailsHeader">Product</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div id="productDetailsBody" className="modal-body">
                            Product details here.
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Dismiss</button>
                        </div>
                    </div>
                </div>
            </div>


            
            {/* display roomList for debugging {"Currently in Project: " + JSON.stringify(props.roomList)} */}

            
        </div>
    )
};