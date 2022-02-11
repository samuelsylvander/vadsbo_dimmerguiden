import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

function Quantity(props) {
    return (
        <p>
        <div className="container bg-primary">
            <div className="row">
                <div className="col"><h3>{props.field}</h3></div>
                <div className="col">
                    <div className="input-group">
                        <span className="input-group-btn">
                            <button type="button" className="btn btn-success btn-number" disabled="disabled" data-type="minus" data-field="quant[1]">
                                <FontAwesomeIcon icon={faMinus} />
                            </button>
                        </span>
                        <input type="text" name="quant[1]" className="form-control input-number" placeholder="1" min="1" max="10" />
                        <span className="input-group-btn">
                            <button type="button" class="btn btn-success btn-number" data-type="plus" data-field="quant[1]">
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </span>
                    </div>
                </div>
                {props.children}
            </div>
        </div>
        </p>
    )
};

export default Quantity;