import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney, faBuilding, faPhone } from "@fortawesome/free-solid-svg-icons";

function TypeTable(props) {

    function handleSwitch(event) {
        event.target.className = "roomtype-active";
        //get all siblings (all buttons in this component)
        const buttons = event.target.parentElement.children;
        // for each button, check if its id matches the event target's, if it doesn't set its class to btn-dark
        for (let i=0; i < buttons.length; i++) {
            if (buttons[i].id !== event.target.id) {
                console.log(buttons[i].className);
                buttons[i].className="roomtype-passive";
            }
        };
    }

    return (
        <>
        <h2>Type of room</h2>
        <div className="row row-cols-4 center">
            <button id="type-home" className="roomtype-passive" onClick={handleSwitch}>
                <FontAwesomeIcon icon={faHouseChimney} /><br/>
                Home
            </button>
            <button id="type-office" className="roomtype-passive" onClick={handleSwitch}>
                <FontAwesomeIcon icon={faBuilding} /><br />
                Office
            </button>
            <button id="type-reception" className="roomtype-passive" onClick={handleSwitch}>
                <FontAwesomeIcon icon={faPhone} /><br/>
                Reception
            </button>
        </div>
        </>
    )
}

export default TypeTable