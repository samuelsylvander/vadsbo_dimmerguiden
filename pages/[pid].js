import { ObjectId } from "mongodb";
import { connectToDatabase } from '../libs/mongodb';
import Head from "next/head";
import NewRoom from "../components/NewRoom";
import Summary from "../components/Summary";
import MoreOptions from '../components/MoreOptions';
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
                <h1>Sorry, can&apos;t access database</h1>
                <h3>Please try again later</h3>
                <p>{errorText}</p>
            </>
        )
    }

    const [appState, setAppState] = useState("summary");
    const blankRoom = {"name": "", "dali": "", "lights": 0, "group": "", "app": "", "switches": 0, "noOfRooms": 1}
    const projectName = loadedProject.projectName
    const [currentRoom, setCurrentRoom] = useState(blankRoom);
    const [roomList, setRoomList] = useState(loadedProject.roomList); //array of all rooms in current project
    const [options, setOptions] = useState(loadedProject.options);


    function saveRoom() {
        setRoomList(prevVal => [...prevVal, currentRoom])
        setAppState("summary")
    };

    function addRoom() {
        setCurrentRoom(blankRoom);
        setAppState("newroom");
    }

    function loadRoom(loadedRoomName) {
        setCurrentRoom(roomList.filter(room => room.name == loadedRoomName)[0]); //filter returns an array, need the [0]
        setRoomList(prevVal => prevVal.filter(room => room.name != loadedRoomName)); //remove that room from the roomList to prevent duplicates
        setAppState("newroom");
    }

    function deleteRoom(deletedIndex) {
        setRoomList(prevVal => prevVal.filter((room, index) => index != deletedIndex));
    }

    useEffect( ()=> {
        if (roomList.length == 0) {
            setAppState("newroom") // if there are no rooms yet, go straight to New Room
        }
    }, [])

    return (
        <>
        <Head>
            <title>Vadsbo dimmerGuiden&trade;</title>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
            <link rel="manifest" href="/site.webmanifest"></link>
        </Head>
        <Header projectId={loadedProject._id}/>
        <div className="container-lg mt-0">

             {appState == "newroom" && <NewRoom  
                projectName={projectName} 
                currentRoom={currentRoom}
                setCurrentRoom={setCurrentRoom}
                saveRoom={saveRoom}
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
            {/* {loadedProject._id} */}
        </div>
        </>
    )
}


