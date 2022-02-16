import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney, faBuilding, faPhone } from "@fortawesome/free-solid-svg-icons";
import Error from "./Error"


function TypeTable(props) {

    function handleSwitch(event) {
        let el = event.currentTarget;
        el.className = "roomtype-active";
        //get all siblings (all buttons in this component)
        const buttons = event.currentTarget.parentElement.children;
        // for each button, check if its id matches the event target's, if it doesn't set its class to btn-dark
        for (let i=0; i < buttons.length; i++) {
            if (buttons[i].id !== el.id) {
                buttons[i].className="roomtype-passive";
            }
        };
        props.setRoomDetails(prevVal => ({...prevVal, [props.property]: el.dataset.roomtype}))
    }

    return (
        <div className="container">
            <h3>Type of room</h3>
            <div className="row row-cols-4 center">
                <button id="type-home" data-roomtype="home" className="roomtype-passive" onClick={handleSwitch}>
                    <FontAwesomeIcon icon={faHouseChimney} /><br/>
                    Home
                </button>
                <button id="type-office" data-roomtype="office" className="roomtype-passive" onClick={handleSwitch}>
                    <FontAwesomeIcon icon={faBuilding} /><br />
                    Office
                </button>
                <button id="type-reception" data-roomtype="reception" className="roomtype-passive" onClick={handleSwitch}>
                    <FontAwesomeIcon icon={faPhone} /><br/>
                    Reception
                </button>
            </div>
            <Error error={props.error} property={props.property} />
        </div>
    )
}

export default TypeTable