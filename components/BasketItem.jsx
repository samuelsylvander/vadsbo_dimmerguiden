import React from "react";

export default function BasketItem(props) {
    return (
        <li className="mb-4">
            <h4>{props.item}</h4>
            <div className="d-flex justify-content-between">
                <div>
                    Antal
                </div>
                <div>
                    {props.quantity}
                </div>
            </div>
        </li>
    )
}