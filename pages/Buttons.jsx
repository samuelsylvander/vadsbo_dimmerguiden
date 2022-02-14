import React from "react";

function Buttons(props) {
    return (
        <div className="container">
            {props.buttons.length > 0 && <button className="button btn-dark" onClick={props.setAppState}>{props.buttons[1]}</button>}
        </div>

    )
};

export default Buttons