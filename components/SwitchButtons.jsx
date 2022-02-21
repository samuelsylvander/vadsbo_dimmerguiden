import React from "react";
import Error from "./Error";

function SwitchButtons(props) {
    const showError = (props.error.includes(props.property)) 

    function handleSwitch(event) {
        props.setCurrentRoom(prevVal => ({...prevVal, [props.property]: event.target.innerHTML}))
    }

    return (
        <div className="container">
            <h3>{props.label}</h3>
            <div>
                {props.field.map((field) => {
                    return (
                        <button 
                            key={field} 
                            className={props.currentRoom[props.property] == field ? "button btn-primary" : "button btn-dark"} 
                            onClick={handleSwitch}
                        >
                            {field}
                        </button>
                    )
                })}
            </div>
            {showError && <Error />}
        </div>
    )
}

export default SwitchButtons