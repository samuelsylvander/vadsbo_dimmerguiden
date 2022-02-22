import React from "react";

function Popup(props) {
    return (
        <div className="popup">
            <div className="popup-title">
                {props.title}
            </div>
            <div className="popup-body">
                {props.body}
            </div>
            <div className="popup-buttons">
                <button className="button btn-dark" onClick={props.confirm[1]}>{props.confirm[0]}</button>
                <button className="button btn-dark" onClick={props.dismiss[1]}>{props.dismiss[0]}</button>
            </div>
        </div>
    )
}

export default Popup