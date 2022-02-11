import React from "react";
import Quantity from "./Quantity";

function Summary(props) {
    return (
        <div className="container">
            {props.basket.map(item => <Quantity field={item.room} />)}
        </div>
    )
};

export default Summary