import React, {useState} from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import '../styles/custom_theme.scss';
import Header from "./Header";
import NewRoom from "./NewRoom";
import NewRoom2 from "./NewRoom2";
// import Buttons from "./Buttons";
import Summary from "./Summary";
import Sidebar from "./Sidebar";

const testbasket = [
  {"room": "Reception", "icon": "phone", "lights": 2, "switches": 4, "app": false},
  {"room": "Office", "icon": "building", "lights": 10, "switches": 6, "app": false}
];

const buttonStates = {
  "newroom1": ["Save Room"],
  "newroom2": ["Save Room"],
  "summary": ["Add room", "More Options"]
}

function MyApp() {
  const [appState, setAppState] = useState("newroom1");
  const [basket, setBasket] = useState(testbasket);

  return (
    <div id="app">
      <Header />
      {appState == "newroom1" && <NewRoom setAppState={setAppState} />}
      {appState == "newroom2" && <NewRoom2 setAppState={setAppState}/>}
      {appState == "summary" && <Summary basket={basket} setAppState={setAppState}/>}
      {/* <Buttons buttons={buttonStates[appState]} setAppState={setAppState} /> */}
      <Sidebar />
    </div>
  )
};

export default MyApp