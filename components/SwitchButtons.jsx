import React from "react";
import Info from "./Info";


//props required
// label
// infoText (currently unused)
// property - what value will actually be set
// (images - not required, but will override what is displayed on the button)
// field - array containing button labels, also values to be set to property
// currentRoom - object with current room details
// setCurrentRoom - function to set room details

function SwitchButtons(props) {
    function handleSwitch(event) {
        const buttonField = event.currentTarget.dataset.field;
        props.setCurrentRoom(prevVal => ({...prevVal, [props.property]: buttonField}))
    }

    return (
        <div className="container">
            <h3 className="d-inline-block mt-4">{props.label}</h3>
            {props.infoText && <Info text={props.infoText} />}
            <div>
                {props.field.map((field, index) => {
                    return (
                        <button 
                            key={field}
                            height="2rem"
                            data-field={field}
                            className={props.currentRoom[props.property] === field ? "btn btn-primary mx-2 p-2 px-3" : "btn btn-outline-dark mx-2 p-2 px-3"} 
                            onClick={handleSwitch}
                        >
                            {props.images ? props.images[index] : field}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default SwitchButtons