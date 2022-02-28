import { ObjectId } from "mongodb";
import { connectToDatabase } from '../libs/mongodb';
import Head from "next/head";
import NewRoom from "../components/NewRoom";
import Summary from "../components/Summary";
import MoreOptions from '../components/MoreOptions';
import GetQuote from "../components/GetQuote";
import React, {useEffect, useState} from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import Header from "../components/Header";


export async function getServerSideProps(context) {
	const pid = context.query.pid;
    console.log("url pid = " + pid);
	let output;

    try {
        const { db } = await connectToDatabase();
        const dbResults = await db.collection("projects")
        output = await dbResults.findOne({_id: new ObjectId(pid)})
        // console.log("database access results: " + JSON.stringify(output))
    } catch (e) {
        console.log("getServerSideProps error")
        // console.log(e)
        return {props: {loadedProject: "errored", errorText: JSON.stringify(e)}}
    }

    return {
        props: {
            loadedProject: JSON.parse(JSON.stringify(output))
        },
    };

}


export default function Project({ loadedProject, errorText }) {
    if (loadedProject == "errored") {
        return (
            <>
                <h1>Sorry, can't access database</h1>
                <h3>Please try again later</h3>
                <p>{errorText}</p>
            </>
        )
    }

    const [appState, setAppState] = useState("summary");
    const blankRoom = {"name": "", "dali": "", "lights": 0, "group": "", "app": "", "switches": 0, "noOfRooms": 1}
    const [projectName, setProjectName] = useState(loadedProject.projectName); //using state to allow for later editing of name
    const [currentRoom, setCurrentRoom] = useState(blankRoom);
    const [roomList, setRoomList] = useState(loadedProject.roomList); //array of all current rooms
    const [roomError, setRoomError] = useState([]); // array with errors from New Room form
    const [options, setOptions] = useState(loadedProject.options);


    function saveRoom() {
        setRoomList(prevVal => [...prevVal, currentRoom])
        setAppState("summary")
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
        setRoomList(prevVal => prevVal.filter(room => room.name != deletedRoomName)); // **bug** if multiple rooms have same name
    }

    useEffect( ()=> {
        if (roomList.length == 0) {
            setAppState("newroom")
        }
    }, [])

    return (
        <>
        <Head>
            <title>Vadsbo dimmerGuiden</title>
        </Head>
        <Header projectId={loadedProject._id}/>
        <div style={{background: "#F7F7F7"}} className="w-50 vh-100 pt-5 mx-auto">
             {appState == "newroom" && <NewRoom  
                projectName={projectName} 
                currentRoom={currentRoom}
                setCurrentRoom={setCurrentRoom}
                saveRoom={saveRoom}
                error={roomError}
            />}
            {appState == "summary" && <Summary 
                projectId={loadedProject._id}
                roomList={roomList} 
                setRoomList={setRoomList}
                setAppState={setAppState} 
                projectName={projectName} 
                addRoom={addRoom}
                loadRoom={loadRoom}
                deleteRoom={deleteRoom}
                options={options}
                setOptions={setOptions}
            />}
            {appState == "moreoptions" && <MoreOptions
                options={options}
                setOptions={setOptions}
                setAppState={setAppState}
            />}
            {appState == "getquote" && <GetQuote 
                setAppState={setAppState}
                projectId={loadedProject._id}
            />}
            {/* {loadedProject._id} */}
        </div>
        </>
    )
}


