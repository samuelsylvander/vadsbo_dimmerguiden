import Head from 'next/head'
import React, {useState} from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import Header from "../components/Header";
import Home from "../components/Home";
import NewRoom from "../components/NewRoom";
import NewRoom2 from "../components/NewRoom2";
import Summary from "../components/Summary";
import Sidebar from "../components/Sidebar";
import GetQuote from "../components/GetQuote";

const testbasket = [
  {"name": "Reception", "icon": "phone", "lights": 2, "switches": 4, "app": false},
  {"name": "Office", "icon": "building", "lights": 10, "switches": 6, "app": false}
];

const buttonStates = {
  "newroom1": ["Save Room"],
  "newroom2": ["Save Room"],
  "summary": ["Add room", "More Options"]
}

const blankRoom = {"name": "", "icon": "", "lights": 3, "switches": 1, "app": "", "noOfRooms": 1}

export default function MyApp(props) {
  const [appState, setAppState] = useState("home");
  const [roomList, setRoomList] = useState([])
  const [basket, setBasket] = useState([]);

  return (
    <div id="app">
      <Head> 
        <title>Vadsbo dimmerGuiden</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" />
      </Head>
      <Header />
      {appState == "home" && <Home setAppState={setAppState}/>}
      {appState == "newroom1" && <NewRoom initialise={blankRoom} setRoomList={setRoomList} setAppState={setAppState} />}
      {appState == "newroom2" && <NewRoom2 setAppState={setAppState}/>}
      {appState == "summary" && <Summary roomList={roomList} setRoomList={setRoomList} setAppState={setAppState}/>}
      {appState == "editroom" && <NewRoom initialise={blankRoom} setRoomList={setRoomList} setAppState={setAppState} />}
      {appState == "getquote" && <GetQuote setAppState={setAppState}/>}
      {/* <Buttons buttons={buttonStates[appState]} setAppState={setAppState} /> */}
      <Sidebar basket={basket} />
    </div>
  )
};