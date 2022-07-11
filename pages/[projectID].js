import { ObjectId } from "mongodb";
import { connectToDatabase } from "../libs/mongodb";
import Head from "next/head";
import NewRoom from "../components/NewRoom";
import Summary from "../components/Summary";
import MoreOptions from "../components/MoreOptions";
import React, { useEffect, useState, useRef } from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import Header from "../components/Header";
import ProjectTemplateContext from "../libs/ProjectTemplateContext";
import ProjectDataContextProvider from "../libs/ProjectDataContext";

export async function getServerSideProps(context) {
	const projectID = context.query.projectID;

	console.log("url pid = " + projectID);
	let output;

	try {
		const { db } = await connectToDatabase();
		const dbResults = await db.collection("projects");
		output = await dbResults.findOne({ _id: new ObjectId(projectID) });
		// console.log("database access results: " + JSON.stringify(output))
	} catch (e) {
		console.log("getServerSideProps error");
		// console.log(e)
		if (projectID.length != 24) {
			return { props: { loadedProject: "errored", errorText: "Invalid Project ID" } };
		}
		return { props: { loadedProject: "errored", errorText: JSON.stringify(e) } };
	}

	return {
		props: {
			loadedProject: JSON.parse(JSON.stringify(output)),
		},
	};
}

export default function Project({ loadedProject, errorText }) {
	const blankRoom = { name: "", dali: "", lights: 0, group: "", app: "", switches: 0, noOfRooms: 1 };

	const [projectName, setProjectName] = useState(loadedProject.projectName);
	const [appState, setAppState] = useState("summary"); // state to control which page is displayed
	const [currentRoom, setCurrentRoom] = useState(blankRoom); // separate state for current room to simplify logic
	const [currentRoomIndex, setCurrentRoomIndex] = useState(-1); // index of room currently being edited. ** -1 for new room **
	const [roomList, setRoomList] = useState(loadedProject.roomList); //array of all rooms in current project
	const [options, setOptions] = useState(loadedProject.options);
	const toast = useRef();

	function saveRoom() {
		if (currentRoomIndex < 0) {
			// -1 means new room, not already in roomList array
			setRoomList((prevVal) => [...prevVal, currentRoom]);
			setAppState("summary");
		} else {
			let editedRooms = [...roomList];
			editedRooms[currentRoomIndex] = currentRoom;
			setRoomList(editedRooms);
			setCurrentRoomIndex(-1);
			setAppState("summary");
		}
	}

	function addRoom() {
		setCurrentRoom(blankRoom);
		setAppState("newroom");
	}

	function loadRoom(loadedRoomIndex) {
		setCurrentRoomIndex(loadedRoomIndex);
		setCurrentRoom(roomList[loadedRoomIndex]);
		setAppState("newroom");
	}

	function deleteRoom(deletedIndex) {
		setRoomList((prevVal) => prevVal.filter((room, index) => index != deletedIndex));
	}

	function showToast(message) {
		document.getElementById("toastMessage").innerHTML = message;
		toast.current.show();
	}

	useEffect(() => {
		const { Toast } = require("bootstrap");
		const toastAlert = document.getElementById("toastAlert");
		toast.current = new Toast(toastAlert);
	}, []);

	useEffect(() => {
		if (roomList.length === 0) {
			setAppState("newroom"); // if there are no rooms yet, go straight to New Room
		}
	}, []);

	if (loadedProject == "errored") {
		if ((errorText = "Invalid Project ID")) {
			return (
				<>
					<Header />
					<div className='text-center m-5'>
						<h1>Vi hittar tyvärr inget projekt med det IDt</h1>
						<h3>Kontrollera så att du har kopierat rätt länk</h3>
						<h3>
							Eller starta ett nytt projekt{" "}
							<a href='' className='text-black'>
								här
							</a>
						</h3>
					</div>
				</>
			);
		} else {
			return (
				<>
					<Header />
					<div className='text-center m-5'>
						<h1>Projektet går inte att öppna</h1>
						<h3>Försök gärna igen senare</h3>
						<p>{errorText}</p>
					</div>
				</>
			);
		}
	}

	return (
		<>
			<Head>
				<title>Vadsbo dimmerGuiden&trade;</title>
				<link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
				<link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
				<link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
				<link rel='manifest' href='/site.webmanifest'></link>
			</Head>
			<Header projectId={loadedProject._id} showToast={showToast} />
			<div className='vw-100 m-0 p-0'>
				<ProjectTemplateContext.Provider>
					<ProjectDataContextProvider>
						{appState == "newroom" && (
							<NewRoom
								projectName={projectName}
								currentRoom={currentRoom}
								setCurrentRoom={setCurrentRoom}
								saveRoom={saveRoom}
							/>
						)}
						{appState == "summary" && (
							<Summary
								projectId={loadedProject._id}
								roomList={roomList}
								setRoomList={setRoomList}
								setAppState={setAppState}
								projectName={projectName}
								setProjectName={setProjectName}
								addRoom={addRoom}
								loadRoom={loadRoom}
								deleteRoom={deleteRoom}
								options={options}
								setOptions={setOptions}
								showToast={showToast}
							/>
						)}
						{appState == "moreoptions" && (
							<MoreOptions options={options} setOptions={setOptions} setAppState={setAppState} />
						)}
					</ProjectDataContextProvider>
				</ProjectTemplateContext.Provider>
			</div>

			{/* Toast Alert */}
			<div className='position-fixed bottom-0 end-0 p-3' style={{ zIndex: 11 }}>
				<div
					id='toastAlert'
					className='toast'
					role='alert'
					aria-live='assertive'
					aria-atomic='true'
					data-bs-delay='1500'
				>
					<div className='d-flex'>
						<div id='toastMessage' className='toast-body'>
							Project Saved!
						</div>
						<button
							type='button'
							className='btn-close me-2 m-auto'
							data-bs-dismiss='toast'
							aria-label='Close'
						></button>
					</div>
				</div>
			</div>
		</>
	);
}
