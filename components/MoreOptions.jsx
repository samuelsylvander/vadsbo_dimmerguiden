import React from "react";

function MoreOptions(props) {
    return (
        <button className="button btn-dark" onClick={()=>props.setAppState("summary")}>Go Back</button>
    )
};

export default MoreOptions