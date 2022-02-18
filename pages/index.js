import Head from 'next/head'
import React, {useState} from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import Header from "../components/Header";
import Home from "../components/Home";
import NewRoom from "../components/NewRoom";
import Summary from "../components/Summary";
import Sidebar from "../components/Sidebar";
import GetQuote from "../components/GetQuote";
import { connectToDatabase } from '../libs/mongodb';



export default function MyApp(props) {
  const [project, setProject] = useState("");
  const [appState, setAppState] = useState("home");
  const [roomList, setRoomList] = useState([])
  const [basket, setBasket] = useState([]);
  const blankRoom = {"name": "", "icon": "", "lights": 1, "switches": 1, "app": "", "noOfRooms": 1}


  function saveProject() {
    console.log(project);
    const savedProjects = JSON.parse(window.localStorage.getItem("projects"));
    if (savedProjects) {
      window.localStorage.setItem("projects", JSON.stringify({...savedProjects, [project]: roomList}));
    } else {
      window.localStorage.setItem("projects", JSON.stringify({[project]: roomList}));
    }
  }

  async function testAPI() {
    const url = "http://localhost:3000/api/hello"
    const request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.onreadystatechange = ()=> {
      if (request.readyState == 4 && request.status == 200) {
        console.log(JSON.parse(request.response).test)
      }
    }
    request.send(JSON.stringify({test: true}));
  }

  async function savetoDB() {
    const url = "http://localhost:3000/api/savetodb"
    const request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.onreadystatechange = ()=> {
      if (request.readyState == 4 && request.status == 200) {
        console.log(request.response)
      }
    }
    request.send(JSON.stringify({projectName: "test project name", roomList: ["room1", "room2", "room3"]}));
  }

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
        setRoomList={setRoomList} 
        setAppState={setAppState}
        dbProjects={props.dbProjects}
      />}
      {appState == "newroom1" && <NewRoom  
        project={project} 
        initialise={blankRoom} 
        setRoomList={setRoomList} 
        setAppState={setAppState} 
      />}
      {appState == "summary" && <Summary 
        roomList={roomList} 
        setRoomList={setRoomList} 
        setAppState={setAppState} 
        project={project} 
        saveProject={saveProject} 
      />}
      {appState == "editroom" && <NewRoom 
        initialise={blankRoom} 
        setRoomList={setRoomList} 
        setAppState={setAppState} 
      />}
      {appState == "getquote" && <GetQuote 
        setAppState={setAppState}
      />}
      {"Currently in Database: " + props.dbProjects}
      <button type="button" onClick={savetoDB}>Test API</button>
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
    return {
      props: {
        dbProjects: JSON.stringify(output)
      },
    };
  } catch (e) {
    console.log(e)
  }
  
}