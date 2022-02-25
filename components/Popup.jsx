import React from "react";

//props:
//title
//body 
//confirm [label, function]
//dismiss [label, function]

function Popup(props) {
    return (
        <div style={{zIndex: 10070}} className="popup">
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