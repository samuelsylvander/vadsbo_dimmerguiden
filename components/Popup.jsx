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
                <button className="button btn-dark" onClick={props.confirm}>OK</button>
                <button className="button btn-dark" onClick={props.dismiss}>Go Back</button>
            </div>
        </div>
    )
}

export default Popup