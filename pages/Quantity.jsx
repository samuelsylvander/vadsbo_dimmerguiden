import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

function Quantity(props) {

    function handleQuantity(event) {
        props.setRoomDetails(prevVal => ({...prevVal, [props.property]: event.target.value}));
    }

    function handleIncrement(event) {
        let value = props.roomDetails[props.property];
        if (event.currentTarget.dataset.type == "plus") {
            value = value + 1;
        } else if (event.currentTarget.dataset.type == "minus") {
            value = value - 1;
        }
        props.setRoomDetails(prevVal => ({...prevVal, [props.property]: value}));
    }

    return (
        <div className="container bg-primary">
            <div className="row justify-content-between">
                <div className="col-4"><h3>{props.label}</h3></div>
                <div className="col-2">
                    <div className="input-group mb-3">
                        <button type="button" className="btn btn-success" data-type="minus" onClick={handleIncrement}>
                            <FontAwesomeIcon icon={faMinus} data-type="minus" />
                        </button>
                        <input id={props.field + "-text"} type="text" className="form-control input-number" value={props.roomDetails[props.property]} onChange={handleQuantity} />
                        <button type="button" className="btn btn-success" data-type="plus" onClick={handleIncrement} >
                            <FontAwesomeIcon icon={faPlus} data-type="plus" />
                        </button>
                    </div>
                </div>
                {props.children}
            </div>
        </div>
    )
};

export default Quantity;

//