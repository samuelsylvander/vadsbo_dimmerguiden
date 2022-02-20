import React from "react";
import Error from "./Error";

function Text(props) {
    const showError = (props.error.includes(props.property)) 

    function handleChange(event) {
        props.setRoomDetails(prevVal => ({...prevVal, [props.property]: event.target.value}))
    }
    
    return (
        <div className="container">
            <div className="row">
                <label>
                    <h3>{props.label}</h3>
                    <input type="text" placeholder="Room name" value={props.roomDetails[props.property]} onChange={handleChange}></input>
                </label>
            </div>
            {showError && <Error />}
        </div>
    )
}

export default Text