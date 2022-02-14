import React from "react"

function SwitchButtons(props) {

    function handleSwitch(event) {
        event.target.className = "button btn-primary";
        //get all siblings (all buttons in this component)
        const buttons = event.target.parentElement.children;
        // for each button, check if its id matches the event target's, if it doesn't set its class to btn-dark
        for (let i=0; i < buttons.length; i++) {
            if (buttons[i].id !== event.target.id) {
                buttons[i].className="button btn-dark"
            }
        };
    }

    return (
        <div className="container">
            <h3>{props.label}</h3>
            <div>
                {props.field.map((field, i) => <button id={props.field[i].replace(/\W/, "") + "-button"} className="button btn-dark" onClick={handleSwitch}>{props.field[i]}</button>)}
            </div>
        </div>
    )
}

export default SwitchButtons