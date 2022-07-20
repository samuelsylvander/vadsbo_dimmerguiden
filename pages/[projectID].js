import { ObjectId } from "mongodb";
import { connectToDatabase } from "../libs/mongodb";
import Head from "next/head";
import NewRoom from "../components/NewRoom";
import Summary from "../components/Summary";
import MoreOptions from "../components/MoreOptions";
import RoomDetails from "../components/RoomDetails";
import React, { useEffect, useState, useRef, useContext, useCallback } from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import Header from "../components/Header";
import { ProjectDataContext } from "../libs/ProjectDataContext";

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
	// const blankRoom = { name: "", dali: "", lights: 0, group: "", app: "", switches: 0, noOfRooms: 1 };

	const [appState, setAppState] = useState("newroom"); // state to control which page is displayed
	const [roomIndex, setRoomIndex] = useState(0);
	const toast = useRef();
	const { isLoading, dispatch } = useContext(ProjectDataContext);

	const showToast = useCallback((message) => {
		document.getElementById("toastMessage").innerHTML = message;
		toast.current.show();
	}, []);

	useEffect(() => {
		//initialise projectData with data from MongoDB
		dispatch({ type: "initialise", value: loadedProject });

		//if this is an existing project, go straight to summary
		if (loadedProject.rooms.length > 1) {
			setAppState("summary");
		}
	}, [loadedProject, dispatch]);

	useEffect(() => {
		//set up bootstrap toasts
		const { Toast } = require("bootstrap");
		const toastAlert = document.getElementById("toastAlert");
		toast.current = new Toast(toastAlert);
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

			{/* App Screens Here */}
			<div className='vw-100 m-0 p-0'>
				{!isLoading && appState == "newroom" && <NewRoom setAppState={setAppState} roomIndex={roomIndex} />}
				{!isLoading && appState == "roomdetails" && (
					<RoomDetails setAppState={setAppState} roomIndex={roomIndex} />
				)}
				{!isLoading && appState == "summary" && (
					<Summary setAppState={setAppState} showToast={showToast} setRoomIndex={setRoomIndex} />
				)}
				{!isLoading && appState == "moreoptions" && <MoreOptions setAppState={setAppState} />}
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
