import React from "react";

function NewRoom2(props) {
    return (
        <div>
            <p>
                <button className="button btn-dark" onClick={() => props.setAppState("newroom1")}>Back</button>
                <button className="button btn-dark" onClick={() => props.setAppState("summary")}>Save Room</button>
            </p>
        </div>
    )
}

export default NewRoom2