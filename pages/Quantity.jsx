import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

function Quantity(props) {
    return (
        <div className="container bg-primary">
            <div className="row">
            <div className="col-10"><h3>Add Lights</h3></div>
            <div className="col">
                <div class="input-group">
                    <span class="input-group-btn">
                        <button type="button" class="btn btn-success btn-number" disabled="disabled" data-type="minus" data-field="quant[1]">
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                    </span>
                    <input type="text" name="quant[1]" class="form-control input-number" value="1" min="1" max="10" />
                    <span class="input-group-btn">
                        <button type="button" class="btn btn-success btn-number" data-type="plus" data-field="quant[1]">
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </span>
                </div>
            </div>
            </div>
        </div>
    )
};

export default Quantity;