import React, { useEffect } from "react";

//props:
//title
//body 
//confirm [label, function]
//dismiss [label, function]

function Popup(props) {

    return (
        <div id="popup" className="popup">
            <div className="popup-title">
                {props.title}
            </div>
            <div className="popup-body">
                {props.body}
            </div>
            <div className="popup-buttons">
                <button className="button btn-dark" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." data-bs-original-title="" title="" onClick={props.confirm[1]}>{props.confirm[0]}</button>
                <button className="button btn-dark" onClick={props.dismiss[1]}>{props.dismiss[0]}</button>
            </div>
        </div>
    )
}

export default Popup