import React from "react";

function Text(props) {
    return (
        <p><div className="container">
            <div className="row">
                <label>
                    Room name
                    <input type="text" placeholder="Room name"></input>
                </label>
            </div>
        </div></p>
    )
}

export default Text