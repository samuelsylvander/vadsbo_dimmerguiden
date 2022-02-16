import React from "react";

function Text(props) {
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
        </div>
    )
}

export default Text