import React from "react";

function Switch(props) {
    return (
        <p>
        <div className="row">
            <div class="input-group">
                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <input type="radio" name="switch" />
                    </div>
                </div>
                {props.field}
                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <input type="radio" name="switch" />
                    </div>
                </div>
                Switch
            </div>
        </div>
        </p>
    )

}

export default Switch