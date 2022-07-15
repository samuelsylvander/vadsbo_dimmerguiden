import React, { useEffect, useCallback, useRef, useContext } from "react";
import RoomQuantity from "./RoomQuantity";
import OptionsList from "./OptionsList";
import Sidebar from "./Sidebar";
import sendEmail from "../libs/sendemail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import debounce from "../libs/debounce";
import { ProjectDataContext } from "../libs/ProjectDataContext";

export default function Summary({ setAppState, showToast }) {
	const { projectData, dispatch } = useContext(ProjectDataContext);

	const quoteModal = useRef();
	const deleteModal = useRef();
	const shareModal = useRef();
	const detailsModal = useRef();
	const confirmModal = useRef();
	const nameModal = useRef();

	const saveProject = useCallback(debounce(saveToDB, 500), []);

	function handleAddRoom() {}

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
			dispatch({ type: "remove", field: "rooms", value: deleteIndex });
			deleteModal.current.hide();
		};
	}

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

	async function handleGetQuote(event) {
		event.preventDefault();
		quoteModal.current.hide();
		confirmModal.current.show();
		const formdata = new FormData(document.getElementById("get-quote-form"));
		formdata.append("projectId", projectData.id);
		formdata.append("url", window.location.href);
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
		formdata.append("url", window.location.href);
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
		document.getElementById("productDetailsHeader").innerText = item;
		document.getElementById("productDetailsBody").innerText = "Details about " + item; // add an object lookup for the details
		detailsModal.current.show();
	}

	useEffect(() => {
		//set up the references to the bootstrap modals
		const { Modal } = require("bootstrap");

		const quote = document.getElementById("getQuote");
		quoteModal.current = Modal.getOrCreateInstance(quote);
		const confirmDelete = document.getElementById("confirmDelete");
		deleteModal.current = Modal.getOrCreateInstance(confirmDelete);
		const shareProject = document.getElementById("shareProject");
		shareModal.current = Modal.getOrCreateInstance(shareProject);
		const productDetails = document.getElementById("productDetails");
		detailsModal.current = Modal.getOrCreateInstance(productDetails);
		const confirm = document.getElementById("quoteSubmitted");
		confirmModal.current = Modal.getOrCreateInstance(confirm);
		const nameChange = document.getElementById("changeName");
		nameModal.current = Modal.getOrCreateInstance(nameChange);
	}, []);

	useEffect(saveProject, [projectData]); //save project every time we change any details

	useEffect(() => {
		//uncollapse the details if less than six items
		if (projectData.rooms.length <= 5) {
			let collapsable = document.getElementsByClassName("collapse");
			for (let i = 0; i < collapsable.length; i++) {
				collapsable[i].className = "collapse show p-0";
			}
		}
	}, []);

	return (
		<>
			<div className='container-lg m-0 mx-lg-auto row vw-100'>
				<div className='col-sm-8 col-xl-9 overflow-auto'>
					<h1 className='my-2'>
						{projectData.name}
						<span className='fs-5' onClick={() => nameModal.current.show()}>
							<FontAwesomeIcon className='fs-6 ms-2' icon={faPenToSquare} />
						</span>
					</h1>
					{projectData.rooms.map((item, index) => {
						return <RoomQuantity key={index} roomIndex={index} />;
					})}

					{/* {projectData.addons.length > 0 && (
						<OptionsList
							label='Tillval'
							edit={() => setAppState("moreoptions")}
							delete={() => dispatch({ type: "replace", field: "addons", value: [] })}
						/>
					)} */}

					<div className='py-5'>
						<button className='btn btn-lg btn-dark mx-3' onClick={handleAddRoom}>
							Lägg till rum
						</button>
						<button className='btn btn-lg  btn-dark mx-3' onClick={() => setAppState("moreoptions")}>
							Tillval
						</button>
						<button className='btn btn-lg  btn-dark mx-3' onClick={() => shareModal.current.show()}>
							Dela
						</button>
					</div>
				</div>

				{/* <div id='basket' style={{ background: "rgba(0,0,0,0.7)" }} className='col-sm-4 col-xl-3 m-0 p-0'>
					<Sidebar setAppState={setAppState} showDetails={showDetails} />
				</div> */}
			</div>

			{/* Confirm Delete Modal */}
			<div
				className='modal fade'
				id='confirmDelete'
				data-bs-backdrop='static'
				data-bs-keyboard='false'
				tabIndex='-1'
				aria-labelledby='staticBackdropLabel'
				aria-hidden='true'
			>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='confirmDeleteLabel'>
								Är du säker?
							</h5>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
							></button>
						</div>
						<div className='modal-body'>Detta går inte att ångra.</div>
						<div className='modal-footer'>
							<button type='button' className='btn btn-outline-dark' data-bs-dismiss='modal'>
								Avbryt
							</button>
							<button id='confirmDeleteButton' type='button' className='btn btn-dark'>
								Radera
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Get Quote Modal */}
			<div
				className='modal fade'
				id='getQuote'
				data-bs-backdrop='static'
				data-bs-keyboard='false'
				tabIndex='-1'
				aria-hidden='true'
			>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h1>Be om offert</h1>
						</div>

						<form id='get-quote-form' name='get-quote' onSubmit={handleGetQuote}>
							<div className='modal-body'>
								<div className='mb-3'>
									<label htmlFor='name' className='form-label'>
										Namn
									</label>
									<input
										type='text'
										className='form-control bg-white'
										id='name'
										name='name'
										required
									/>
								</div>
								<div className='mb-3'>
									<label htmlFor='phone' className='form-label'>
										Telefon
									</label>
									<input
										type='text'
										className='form-control bg-white'
										id='phone'
										name='phone'
										required
									/>
								</div>
								<div className='mb-3'>
									<label htmlFor='email' className='form-label'>
										E-post
									</label>
									<input
										type='email'
										className='form-control bg-white'
										id='email'
										name='email'
										required
									/>
								</div>
								<div className='mb-3'>
									<label htmlFor='message' className='form-label'>
										Övrig information
									</label>
									<textarea className='form-control bg-white' id='message' name='message'></textarea>
								</div>
								<div className='mb-3'>
									<input
										type='checkbox'
										className='form-check-input me-2'
										id='quoteacceptpolicy'
										name='acceptpolicy'
										required
									/>
									<label htmlFor='quoteacceptpolicy' className='form-label'>
										Godkänn hur vi hanterar dina{" "}
										<a
											href='https://www.vadsbo.net/integritetspolicy/'
											target='_blank'
											rel='noreferrer'
											className='text-black'
										>
											personuppgifter
										</a>
									</label>
								</div>
							</div>
							<div className='modal-footer'>
								<button
									id='dismissmodal'
									className='btn btn-outline-dark me-2'
									type='button'
									data-bs-dismiss='modal'
								>
									Avbryt
								</button>
								<button className='btn btn-dark' type='submit'>
									Skicka
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>

			{/* Share Project Modal */}
			<div
				className='modal fade'
				id='shareProject'
				data-bs-backdrop='static'
				data-bs-keyboard='false'
				tabIndex='-1'
				aria-hidden='true'
			>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h1>Be om offert</h1>
						</div>

						<form id='share-project-form' name='share-project' onSubmit={handleShare}>
							<div className='modal-body'>
								<div className='mb-3'>
									<label htmlFor='name' className='form-label'>
										Namn
									</label>
									<input
										type='text'
										className='form-control bg-white'
										id='name'
										name='name'
										required
									/>
								</div>
								<div className='mb-3'>
									<label htmlFor='email' className='form-label'>
										E-post
									</label>
									<input
										type='email'
										className='form-control bg-white'
										id='email'
										name='email'
										required
									/>
								</div>
								<div className='mb-3'>
									<label htmlFor='message' className='form-label'>
										Övrig information
									</label>
									<textarea
										className='form-control bg-white'
										id='message'
										name='message'
										required
									></textarea>
								</div>
								<div className='mb-3'>
									<label htmlFor='shareacceptpolicy' className='form-label'>
										<input
											type='checkbox'
											className='form-check-input me-2'
											id='shareacceptpolicy'
											name='acceptpolicy'
											required
										/>
										Godkänn hur vi hanterar dina{" "}
										<a
											href='https://www.vadsbo.net/integritetspolicy/'
											target='_blank'
											rel='noreferrer'
											className='text-black'
										>
											personuppgifter
										</a>
									</label>
								</div>
							</div>
							<div className='modal-footer'>
								<button
									id='dismissmodal'
									className='btn btn-outline-dark me-2'
									type='button'
									data-bs-dismiss='modal'
								>
									Avbryt
								</button>
								<button className='btn btn-dark' type='submit'>
									Skicka
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>

			{/* Sidebar Product Info Modal */}
			<div
				className='modal fade'
				id='productDetails'
				data-bs-backdrop='static'
				data-bs-keyboard='false'
				tabIndex='-1'
				aria-labelledby='staticBackdropLabel'
				aria-hidden='true'
			>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='productDetailsHeader'>
								Produkt
							</h5>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
							></button>
						</div>
						<div id='productDetailsBody' className='modal-body'>
							Produktdetaljer.
						</div>
						<div className='modal-footer'>
							<button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
								Avbryt
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Quote Submitted Modal */}
			<div
				className='modal fade'
				id='quoteSubmitted'
				data-bs-backdrop='static'
				data-bs-keyboard='false'
				tabIndex='-1'
				aria-labelledby='staticBackdropLabel'
				aria-hidden='true'
			>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='quoteSubmittedLabel'>
								Your Request Was Submitted
							</h5>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
							></button>
						</div>
						<div className='modal-body'>
							Vill du fortsätta att arbeta på projektet, eller gå vidare till www.vadsbo.net?
						</div>
						<div className='modal-footer'>
							<button type='button' className='btn btn-outline-dark me-2' data-bs-dismiss='modal'>
								Tillbaka till Projektet
							</button>
							<a href='https://www.vadsbo.net' id='goToVadsbo' type='button' className='btn btn-dark'>
								Vidare till vadsbo.net
							</a>
						</div>
					</div>
				</div>
			</div>

			{/* Change Project Name Modal */}
			<div
				className='modal fade'
				id='changeName'
				data-bs-backdrop='static'
				data-bs-keyboard='false'
				tabIndex='-1'
				aria-labelledby='staticBackdropLabel'
				aria-hidden='true'
			>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='confirmDeleteLabel'>
								Uppdatera Projektets Namn
							</h5>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
							></button>
						</div>
						<form id='change-name-form' name='share-project' onSubmit={handleNameChange}>
							<div className='modal-body'>
								<div className='mb-3'>
									<label htmlFor='name' className='form-label'>
										Nytt Projektnamn
									</label>
									<input
										type='text'
										placeholder={projectData.name}
										className='form-control bg-white'
										id='newProjectName'
										required
									/>
								</div>
							</div>
							<div className='modal-footer'>
								<button
									id='dismissmodal'
									className='btn btn-outline-dark me-2'
									type='button'
									data-bs-dismiss='modal'
								>
									Avbryt
								</button>
								<button className='btn btn-dark' type='submit'>
									Spara
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>

			{/* display roomList for debugging {"Currently in Project: " + JSON.stringify(roomList)} */}
		</>
	);
}
