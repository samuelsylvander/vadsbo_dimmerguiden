import Head from 'next/head'
import React, {useEffect, useState} from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import Header from "../components/Header";
import Home from "../components/Home";
import NewRoom from "../components/NewRoom";
import Summary from "../components/Summary";
import MoreOptions from '../components/MoreOptions';
import Sidebar from "../components/Sidebar";
import GetQuote from "../components/GetQuote";
import { connectToDatabase } from '../libs/mongodb';
import savetoDB from '../libs/savetodb';


export default function MyApp(props) {
	const blankRoom = {"name": "", "icon": "", "lights": 1, "switches": 1, "app": "", "noOfRooms": 1}
	const [project, setProject] = useState("");
	const [appState, setAppState] = useState("home");
	const [roomList, setRoomList] = useState([]); //array of all current rooms
	const [basket, setBasket] = useState([]); //array of all basket items (not yet implemented)
	const [roomDetails, setRoomDetails] = useState(blankRoom); //object containing details of current room
	const [roomError, setRoomError] = useState([]); // array with errors from New Room form
	const [projectList, setProjectList] = useState([]); // array with all projects


	function saveRoom() {
        if (checkDetails()) {
            setRoomList(prevVal => [...prevVal, roomDetails])
            setAppState("summary")
        }
    };

	function checkDetails() {
        let currentErrors = [];
        for (let prop in roomDetails) {
            if (roomDetails[prop] === "") {
                currentErrors.push(prop);
            };
        };
		console.log(currentErrors)
        if (currentErrors.length == 0) {
			setRoomError([]);
            return true
        } else {
			setRoomError(currentErrors);
            return false
        };
    };

	function saveProject() {
		// save to both localStorage and to database
		const savedProjects = JSON.parse(window.localStorage.getItem("projects"));
		if (savedProjects) {
			window.localStorage.setItem("projects", JSON.stringify([...savedProjects, {projectName: project, roomList: roomList, date: new Date()}]));
		} else {
			window.localStorage.setItem("projects", JSON.stringify([{projectName: project, roomList: roomList, date: new Date()}]))
		};
		savetoDB(project, roomList);
	};

	function addRoom() {
		setRoomDetails(blankRoom)
		setRoomError([])
		setAppState("newroom")
	}

	function loadRoom(loadedRoomName) {
		setRoomDetails(roomList.filter(room => room.name == loadedRoomName)[0]);
		setRoomList(prevVal => prevVal.filter(room => room.name != loadedRoomName));
		setRoomError([]);
		setAppState("newroom") 
	}

	function deleteRoom(deletedRoomName) {
		setRoomList(prevVal => prevVal.filter(room => room.name != deletedRoomName));
	}

	function initialiseProjects() {
		const localProjects = JSON.parse(window.localStorage.getItem("projects"))
		const output = [];
	
		if (localProjects == undefined) {
			return props.dbProjects
		}
		console.log(localProjects.length)

		if (props.dbProjects.length >= localProjects.length) {
			props.dbProjects.forEach(dbproject => {
				const localproject = localProjects.find(search => search.projectName === dbproject.projectName);
				if (localproject != undefined && dbproject.date < localproject.date) {
					output.push(localproject)
				} else {
					output.push(dbproject)
				}
			})
		} else {
			localProjects.forEach(localproject => {
				const dbproject = props.dbProjects.find(search => search.projectName === localproject.projectName);
				if (dbproject != undefined && localproject.date < dbproject.date) {
					output.push(dbproject)
				} else {
					output.push(localproject)
				}
			})
		}
		return output
	}

	useEffect( () => {
		setProjectList(initialiseProjects())
	}, [])

	return (
		<div id="app">
			<Head> 
				<title>Vadsbo dimmerGuiden</title>
			</Head>
			<Header />
			<Sidebar basket={basket} />
			{appState == "home" && <Home 
				project={project}
				setProject={setProject} 
				projectList={projectList}
				setRoomList={setRoomList} 
				setAppState={setAppState}
				dbProjects={props.dbProjects}
			/>}
			{appState == "newroom" && <NewRoom  
				project={project} 
				roomDetails={roomDetails}
				setRoomDetails={setRoomDetails}
				saveRoom={saveRoom}
				error={roomError}
			/>}
			{appState == "summary" && <Summary 
				roomList={roomList} 
				setRoomList={setRoomList} 
				setAppState={setAppState} 
				project={project} 
				saveProject={saveProject}
				addRoom={addRoom}
				loadRoom={loadRoom}
				deleteRoom={deleteRoom}
			/>}
			{appState == "moreoptions" && <MoreOptions
				setAppState={setAppState}
			/>}
			{appState == "getquote" && <GetQuote 
				setAppState={setAppState}
			/>}

			{/* {error && <Popup {...popup}/>} */}

			{/*   debugging code to test database API    */}
			{/* {"Currently in Database: " + props.dbProjects}
			<button type="button" onClick={savetoDB}>Test API</button> */}
		</div>
	)
};

export async function getServerSideProps() {
	let output = [];

	try {
		const { db } = await connectToDatabase();
		const dbResults = await db.collection("vadsbo")
		const find = await dbResults.find({})
		const results = await find.forEach(document => output.push(document));
		console.log("database access results: " + results)
	} catch (e) {
		console.log(e)
	}

	return {
		props: {
			dbProjects: JSON.parse(JSON.stringify(output))
		},
	};
}