import React from "react";

function Error(props) {
    if (props.error == props.property) {
        return (
            <div className="container bg-info custom-warning">
                <div className="custom-warning-pointer bg-info"></div>
                Please make a selection
            </div>
        )
    } else {
        return (null)
    }
};

export default Error