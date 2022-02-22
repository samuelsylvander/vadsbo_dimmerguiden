import React from "react";
import Error from "./Error";
import Info from "./Info";

function Text(props) {
    const showError = (props.error.includes(props.property)) 

    function handleChange(event) {
        props.setCurrentRoom(prevVal => ({...prevVal, [props.property]: event.target.value}))
    }
    
    return (
        <div className="container">
            <div className="row">
                <label>
                    <h3 className="d-inline-block">{props.label}</h3>
                    {props.infoText && <Info text={props.infoText} />}
                    <input type="text" placeholder="Room name" value={props.currentRoom[props.property]} onChange={handleChange}></input>
                </label>
            </div>
            {showError && <Error />}
        </div>
    )
}

export default Text