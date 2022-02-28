import React from "react";
import Info from "./Info";

//props required
// label
// infoText (currently unused)
// property - what value will actually be set
// currentRoom - object with current room details
// setCurrentRoom - function to set room details

function Text(props) {
    function handleChange(event) {
        props.setCurrentRoom(prevVal => ({...prevVal, [props.property]: event.target.value}))
    }
    
    return (
        <div className="container">
            <div className="row">
                <label>
                    <h3 className="d-inline-block">{props.label}</h3>
                    {props.infoText && <Info text={props.infoText} />}
                    <input className="fs-4" type="text" placeholder="Room name" value={props.currentRoom[props.property]} onChange={handleChange}></input>
                </label>
            </div>
        </div>
    )
}

export default Text