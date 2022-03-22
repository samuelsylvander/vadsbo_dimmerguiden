import React from "react";
import Info from "./Info";
import daliLogo from "../public/dali_r_logo_black.png";
import Image from "next/image";

//props required
// label
// infoText (currently unused)
// property - what value will actually be set
// field - array containing button labels, also values to be set to property
// currentRoom - object with current room details
// setCurrentRoom - function to set room details

function SwitchButtons(props) {
    function handleSwitch(event) {
        const buttonField = event.currentTarget.dataset.field;
        props.setCurrentRoom(prevVal => ({...prevVal, [props.property]: buttonField}))
    }

    function formatField(field) {
        if (field.includes("DALI")) {
            return (
            <div className="d-flex align-items-center fw-bold">
                <Image src={daliLogo} height={35} width={110} alt="DALI"/>
                {field.slice(4)}
            </div>
            )
        } else {
            return field
        }
    }

    return (
        <div className="container">
            <h3 className="d-inline-block my-4">{props.label}</h3>
            {props.infoText && <Info text={props.infoText} />}
            <div>
                {props.field.map((field) => {
                    return (
                        <button 
                            key={field}
                            height="2rem"
                            data-field={field}
                            className={props.currentRoom[props.property] == field ? "btn btn-primary mx-2 p-2 px-3" : "btn btn-outline-dark mx-2 p-2 px-3"} 
                            onClick={handleSwitch}
                        >
                            {formatField(field)}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default SwitchButtons