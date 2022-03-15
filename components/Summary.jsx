import React, { useEffect, useCallback, useRef } from "react";
import RoomQuantity from "./RoomQuantity";
import OptionsList from "./OptionsList";
import Sidebar from "./Sidebar";
import sendEmail from "../libs/sendemail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import debounce from "../libs/debounce";

export default function Summary(props) {
    const shareURL = `localhost:3000/${props.projectId}` //!!change at production
    const quoteModal = useRef();
    const deleteModal = useRef();
    const shareModal = useRef();
    const detailsModal = useRef();
    const confirmModal = useRef();
    const nameModal = useRef();

    const saveProject = useCallback(debounce(saveToDB, 500), [])
   

    function checkOptions() {
        if (Object.keys(props.options).some(key=>props.options[key] == "Ja")) {
            return true
        } else {
            return false
        }
    };

    function handleNameChange(event) {
        event.preventDefault()
        const newName = document.getElementById("newProjectName").value;
        props.setProjectName(newName);
        nameModal.current.hide();
    }

    function handleDelete(deleteIndex) {
        deleteModal.current.show();
        let deleteButton = document.getElementById("confirmDeleteButton")
        deleteButton.onclick = () => {
            props.deleteRoom(deleteIndex);
            deleteModal.current.hide()
        }
    }

    async function saveToDB() {
        const url = "http://localhost:3000/api/savetodbAPI"
        await fetch(url, {
            method: "POST",
            body: JSON.stringify({id: props.projectId, projectName: props.projectName, roomList: props.roomList, options: props.options})
        })
            .then(response => response.json())
            .then((response)=> {
                console.dir(response)
                props.showToast("Project Saved!")
            })
            .catch(error => console.log("database error: " + error));
        
    }

    async function handleGetQuote(event) {
        event.preventDefault();
        quoteModal.current.hide();
        confirmModal.current.show();
        const formdata = new FormData(document.getElementById("get-quote-form"));
        formdata.append("projectId", props.projectId);
        formdata.append("url", shareURL);
        formdata.append("source", "getQuote");
        const result = await sendEmail(formdata);
        if (result === "success") {
            props.showToast("Request Successfully Submitted")
        } else {
            props.showToast("An error occurred, please try again")
        }
    }

    async function handleShare(event) {
        event.preventDefault();
        shareModal.current.hide()
        const formdata = new FormData(document.getElementById("share-project-form"));
        formdata.append("projectId", props.projectId);
        formdata.append("url", shareURL);
        formdata.append("source", "shareProject");
        const result = await sendEmail(formdata);
        if (result === "success") {
            props.showToast("Email Sent!")
        } else {
            props.showToast("An error occurred, please try again")
        }
    }

    function showDetails(item) {
        document.getElementById("productDetailsHeader").innerText = item
        document.getElementById("productDetailsBody").innerText = "Details about " + item // add an object lookup for the details
        detailsModal.current.show()
    }

    useEffect(()=> { //set up the references to the bootstrap modals
        const { Modal } = require('bootstrap')

        const quote = document.getElementById('getQuote');
        quoteModal.current = Modal.getOrCreateInstance(quote);
        const confirmDelete = document.getElementById('confirmDelete');
        deleteModal.current = Modal.getOrCreateInstance(confirmDelete);
        const shareProject = document.getElementById('shareProject');
        shareModal.current = Modal.getOrCreateInstance(shareProject);
        const productDetails = document.getElementById('productDetails');
        detailsModal.current = Modal.getOrCreateInstance(productDetails);
        const confirm = document.getElementById('quoteSubmitted');
        confirmModal.current = Modal.getOrCreateInstance(confirm);
        const nameChange = document.getElementById('changeName');
        nameModal.current = Modal.getOrCreateInstance(nameChange);

    }, [])

    useEffect(()=> saveProject(), [props.roomList, props.projectName, props.options]) //save project every time we change any details

    useEffect(()=>{ //uncollapse the details if less than six items
        if (props.roomList.length <= 5) {
            let collapsable = document.getElementsByClassName("collapse");
            for (let i=0; i<collapsable.length; i++) {
                collapsable[i].className = "collapse show p-0"
            }
        }
    },[])


    return (
        <>
        <div className="container-lg m-0 mx-lg-auto row vw-100">
            <div className="col-sm-8 col-xl-9 overflow-auto">
                <h1 className="my-2">
                    {props.projectName}
                    <span className="fs-5" onClick={()=>nameModal.current.show()}><FontAwesomeIcon className="fs-6 ms-2" icon={faPenToSquare}/></span>
                </h1>
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

            <div id="basket" style={{background: "rgba(0,0,0,0.7)"}} className="col-sm-4 col-xl-3 m-0 p-0">
                <Sidebar 
                    roomList={props.roomList} 
                    setAppState={props.setAppState}
                    options={props.options}
                    showDetails={showDetails}
                />
            </div>
        </div>

                {/* Confirm Delete Modal */}
            <div className="modal fade" id="confirmDelete" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
            <div className="modal fade" id="getQuote" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-hidden="true">
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
                                    <input type="checkbox" className="form-check-input me-2" id="quoteacceptpolicy" name="acceptpolicy" required />
                                    <label htmlFor="quoteacceptpolicy" className="form-label">
                                        Accept our <a href="https://www.vadsbo.net/integritetspolicy/" target="_blank" rel="noreferrer" className="text-black">privacy policy</a>
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
            <div className="modal fade" id="shareProject" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-hidden="true">
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
                                    <label htmlFor="shareacceptpolicy" className="form-label">
                                        <input type="checkbox" className="form-check-input me-2" id="shareacceptpolicy" name="acceptpolicy" required />
                                        Accept our <a href="https://www.vadsbo.net/integritetspolicy/" target="_blank" rel="noreferrer" className="text-black">privacy policy</a>
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
            <div className="modal fade" id="productDetails" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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

                {/* Quote Submitted Modal */}
            <div className="modal fade" id="quoteSubmitted" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="quoteSubmittedLabel">Your Request Was Submitted</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Would you like to continue editing this project, or go back to www.vadsbo.net?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-dark me-2" data-bs-dismiss="modal">Go Back to Project</button>
                            <a href="https://www.vadsbo.net" id="goToVadsbo" type="button" className="btn btn-dark">Go to vadsbo.net</a>
                        </div>
                    </div>
                </div>
            </div>

                {/* Change Project Name Modal */}
            <div className="modal fade" id="changeName" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="confirmDeleteLabel">Edit Project Name</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form id="change-name-form" name="share-project" onSubmit={handleNameChange}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">New Project Name</label>
                                    <input type="text" placeholder={props.projectName} className="form-control bg-white" id="newProjectName" required />
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


            
            {/* display roomList for debugging {"Currently in Project: " + JSON.stringify(props.roomList)} */}

            
        </>
    )
};