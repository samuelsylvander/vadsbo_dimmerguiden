import React from "react";

export default function BasketItem(props) {
    return (
        <li>
            <h4>{props.item}</h4>
            <div className="d-flex justify-content-between">
                <div>
                    Amount
                </div>
                <div>
                    {props.quantity}
                </div>
            </div>
        </li>
    )
}