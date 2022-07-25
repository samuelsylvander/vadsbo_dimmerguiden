import React, { useEffect, useRef, useContext } from "react";
import RoomQuantity from "./RoomQuantity";
import OptionsList from "./OptionsList";
import Sidebar from "./Sidebar";
import sendEmail from "../libs/sendemail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import debounce from "../libs/debounce";
import { ProjectDataContext } from "../libs/ProjectDataContext";
import Modals from "./modals/Modals";

export default function Summary({ setAppState, showToast, setRoomIndex }) {
	const { projectData, dispatch } = useContext(ProjectDataContext);
	const quoteModal = useRef();
	const deleteModal = useRef();
	const shareModal = useRef();
	const detailsModal = useRef();
	const confirmModal = useRef();
	const nameModal = useRef();

	function handleAddRoom() {
		setRoomIndex(projectData.rooms.length);
		setAppState("newroom");
	}

	function handleNameChange(event) {
		event.preventDefault();
		const newName = document.getElementById("newProjectName").value;
		dispatch({ type: "replace", field: "name", value: newName });
		nameModal.current.hide();
	}

	function handleDelete(deleteIndex) {
		deleteModal.current.show();
		let deleteButton = document.getElementById("confirmDeleteButton");
		deleteButton.onclick = () => {
			dispatch({ type: "remove-index", field: "rooms", value: deleteIndex });
			deleteModal.current.hide();
		};
	}

	async function handleGetQuote(event) {
		event.preventDefault();
		quoteModal.current.hide();
		confirmModal.current.show();
		const formdata = new FormData(document.getElementById("get-quote-form"));
		formdata.append("projectId", projectData.id);
		formdata.append("url", window.location.origin + window.location.pathname);
		formdata.append("source", "getQuote");
		const result = await sendEmail(formdata);
		if (result === "success") {
			showToast("Request Successfully Submitted");
		} else {
			showToast("An error occurred, please try again");
		}
	}

	async function handleShare(event) {
		event.preventDefault();
		shareModal.current.hide();
		const formdata = new FormData(document.getElementById("share-project-form"));
		formdata.append("projectId", projectData.id);
		formdata.append("url", window.location.origin + window.location.pathname);
		formdata.append("source", "shareProject");
		const result = await sendEmail(formdata);
		if (result === "success") {
			showToast("Email Sent!");
		} else {
			showToast("An error occurred, please try again");
		}
	}

	function showDetails(item) {
		//come back and fix this later
		document.getElementById("productDetailsHeader").innerText = "Product Details";
		document.getElementById("productDetailsBody").innerText = "Details about " + item; // add an object lookup for the details
		detailsModal.current.show();
	}

	useEffect(() => {
		//set up the references to the bootstrap modals
		const { Modal } = require("bootstrap");
		quoteModal.current = Modal.getOrCreateInstance(document.getElementById("getQuote"));
		deleteModal.current = Modal.getOrCreateInstance(document.getElementById("confirmDelete"));
		shareModal.current = Modal.getOrCreateInstance(document.getElementById("shareProject"));
		detailsModal.current = Modal.getOrCreateInstance(document.getElementById("productDetails"));
		confirmModal.current = Modal.getOrCreateInstance(document.getElementById("quoteSubmitted"));
		nameModal.current = Modal.getOrCreateInstance(document.getElementById("changeName"));
	}, []);

	useEffect(() => {
		async function saveToDB() {
			const url = "/api/savetodbAPI";
			try {
				const response = await fetch(url, {
					method: "POST",
					body: JSON.stringify(projectData),
				});
				if (response.status === 200) {
					showToast("Project Saved!");
				}
			} catch (error) {
				console.log("database error: " + error);
			}
		}
		debounce(saveToDB, 500);
	}, [projectData, showToast]); //save project every time we change any details

	return (
		<>
			<div className='container-lg m-0 mx-lg-auto row vw-100 p-0'>
				<div className='col-sm-8 col-xl-9 overflow-auto pe-md-4'>
					<h1 className='my-2'>
						{projectData.name}
						<span className='fs-5' onClick={() => nameModal.current.show()}>
							<FontAwesomeIcon className='fs-6 ms-2' icon={faPenToSquare} />
						</span>
					</h1>
					{projectData.rooms.map((item, index) => {
						return (
							<RoomQuantity
								key={index}
								roomIndex={index}
								setAppState={setAppState}
								setRoomIndex={setRoomIndex}
								handleDelete={handleDelete}
							/>
						);
					})}

					{projectData.products.length > 0 && (
						<OptionsList label='Tillval' handleEdit={() => setAppState("moreoptions")} />
					)}

					<div className='d-flex flex-wrap gap-3 my-5'>
						<div className=''>
							<button className='btn btn-lg btn-dark mx-3' onClick={handleAddRoom}>
								Lägg till rum
							</button>
						</div>
						<div className=''>
							<button className='btn btn-lg  btn-dark mx-3' onClick={() => setAppState("moreoptions")}>
								Tillval
							</button>
						</div>
						<div className=''>
							<button className='btn btn-lg  btn-dark mx-3' onClick={() => shareModal.current.show()}>
								Dela
							</button>
						</div>
					</div>
				</div>

				<div id='basket' style={{ background: "rgba(0,0,0,0.7)" }} className='col-sm-4 col-xl-3 m-0 p-0'>
					<Sidebar setAppState={setAppState} showDetails={showDetails} />
				</div>
			</div>
			<Modals
				handleGetQuote={handleGetQuote}
				handleShare={handleShare}
				handleNameChange={handleNameChange}
				projectName={projectData.name}
			/>
		</>
	);
}
