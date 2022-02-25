import React from "react";
import Error from "./Error";
import Info from "./Info";

function SwitchButtons(props) {
    let showError = "";
    if (props.error) {
        showError = (props.error.includes(props.property)) 
    };

    function handleSwitch(event) {
        props.setCurrentRoom(prevVal => ({...prevVal, [props.property]: event.target.innerHTML}))
    }

    return (
        <div className="container">
            <h3 className="d-inline-block">{props.label}</h3>
            {props.infoText && <Info text={props.infoText} />}
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