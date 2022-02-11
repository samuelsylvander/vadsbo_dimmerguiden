import React from "react";

function Buttons(props) {
    return (
        <div className="container">
            <button className="button btn-dark" type="submit" onClick={props.setAppState}>Save Room</button>
            {props.appState == "summary" && <button className="button btn-dark" type="submit" onClick={props.setAppState}>More Options</button>}
        </div>

    )
};

export default Buttons