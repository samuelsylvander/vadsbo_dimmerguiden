import React from "react";

function Switch(props) {
    return (
        <div className="row">
            <div class="input-group">
                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <input type="radio" name="switch" />
                    </div>
                </div>
                {props.field[0]}
                <br />
                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <input type="radio" name="switch" />
                    </div>
                </div>
                {props.field[1]}
            </div>
        </div>
    )

}

export default Switch