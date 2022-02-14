import React from "react";

function Text(props) {
    return (
        <div className="container">
            <div className="row">
                <label>
                    <h3>{props.label}</h3>
                    <input type="text" placeholder="Room name"></input>
                </label>
            </div>
        </div>
    )
}

export default Text