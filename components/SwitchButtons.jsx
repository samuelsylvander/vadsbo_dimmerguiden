import React from "react";
import Error from "./Error";
import Info from "./Info";
import daliLogo from "../public/dali_r_logo_black.png";
import Image from "next/image";

function SwitchButtons(props) {
    let showError = "";
    if (props.error) {
        showError = (props.error.includes(props.property)) 
    };

    function handleSwitch(event) {
        const buttonField = event.currentTarget.dataset.field;
        props.setCurrentRoom(prevVal => ({...prevVal, [props.property]: buttonField}))
    }

    function formatField(field) {
        if (field.includes("DALI")) {
            return (
            <span>
                <Image src={daliLogo} height={23} width={72}/>
                {field.slice(4)}
            </span>
            )
        } else {
            return field
        }
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
                            height="2rem"
                            data-field={field}
                            className={props.currentRoom[props.property] == field ? "button btn-primary" : "button"} 
                            onClick={handleSwitch}
                        >
                            {formatField(field)}
                        </button>
                    )
                })}
            </div>
            {showError && <Error />}
        </div>
    )
}

export default SwitchButtons