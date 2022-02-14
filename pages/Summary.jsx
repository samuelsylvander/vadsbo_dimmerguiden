import React from "react";
import Quantity from "./Quantity";

function Summary(props) {
    return (
        <div className="container">
            <h1>Summary</h1>
            {props.basket.map(item => <p><Quantity field={item.room} /></p>)}
            <p>
                <button className="button btn-dark" onClick={() => props.setAppState("newroom1")}>Add Room</button>
                <button className="button btn-dark" onClick={() => props.setAppState("moreoptions")}>More Options</button>
            </p>
        </div>
    )
};

export default Summary