import { ObjectId } from "mongodb";
import { connectToDatabase } from '../libs/mongodb';
import Head from "next/head";
import NewRoom from "../components/NewRoom";
import Summary from "../components/Summary";
import MoreOptions from '../components/MoreOptions';
import Sidebar from "../components/Sidebar";
import GetQuote from "../components/GetQuote";
import { useRouter } from 'next/router';
import React, {useEffect, useState} from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export async function getServerSideProps(context) {
	const pid = context.query.pid;
    console.log("url pid = " + pid);
	let output;

	try {
		const { db } = await connectToDatabase();
		const dbResults = await db.collection("vadsbo")
		output = await dbResults.findOne({_id: new ObjectId(pid)})
		console.log("database access results: " + JSON.stringify(output))
	} catch (e) {
		console.log(e)
	}



	return {
		props: {
			loadedProject: JSON.parse(JSON.stringify(output))
		},
	};
}

export default function Project({ loadedProject}) {
    const [appState, setAppState] = useState("summary");
    const router = useRouter();
    const blankRoom = {"name": "", "lights": 1, "switches": 1, "app": "", "noOfRooms": 1}
    const [projectName, setProjectName] = useState(loadedProject.projectName);
    const [currentRoom, setCurrentRoom] = useState(blankRoom);
    const [roomList, setRoomList] = useState(loadedProject.roomList); //array of all current rooms
    const [roomError, setRoomError] = useState([]); // array with errors from New Room form
    const [basket, setBasket] = useState([]); //array of all basket items (not yet implemented)


    function saveRoom() {
        if (checkDetails()) {
            setRoomList(prevVal => [...prevVal, currentRoom])
            setAppState("summary")
        }
    };

    function checkDetails() {
        let currentErrors = [];
        for (let prop in currentRoom) {
            if (currentRoom[prop] === "") {
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

    function addRoom() {
        setCurrentRoom(blankRoom);
        setRoomError([]);
        setAppState("newroom");
    }

    function loadRoom(loadedRoomName) {
        setCurrentRoom(roomList.filter(room => room.name == loadedRoomName)[0]); //filter returns an array, need the [0]
        setRoomList(prevVal => prevVal.filter(room => room.name != loadedRoomName)); //remove that room from the roomList to prevent duplicates
        setRoomError([]);
        setAppState("newroom");
    }

    function deleteRoom(deletedRoomName) {
        setRoomList(prevVal => prevVal.filter(room => room.name != deletedRoomName));
    }

    async function saveProject() {
        const url = "http://localhost:3000/api/savetodbAPI"
        const request = new XMLHttpRequest();
        request.open("POST", url, true);
        request.onreadystatechange = ()=> {
            if (request.readyState == 4 && request.status == 200) {
                console.log("server response: " + request.response);
              }
        }
        request.send(JSON.stringify({id: loadedProject._id, projectName: projectName, roomList: roomList }));
    }

    return (
        <>
            <Head>
                <title>Vadsbo dimmerGuiden</title>
            </Head>
            <Sidebar basket={basket} />
            {appState == "newroom" && <NewRoom  
                projectName={projectName} 
                currentRoom={currentRoom}
                setCurrentRoom={setCurrentRoom}
                saveRoom={saveRoom}
                error={roomError}
            />}
            {appState == "summary" && <Summary 
                roomList={roomList} 
                setRoomList={setRoomList}
                setAppState={setAppState} 
                projectName={projectName} 
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
        </>
    )
}


