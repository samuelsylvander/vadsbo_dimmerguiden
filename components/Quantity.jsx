import React from "react";
import Info from "./Info";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

// props required:
// currentRoom: object to edit, controls input field
// setCurrentRoom: function used to edit currentRoom
// property: property of currentRoom to adjust
// label: what to display

function Quantity(props) {

    function handleQuantity(event) {
        let update = event.target.value.replace(/\D/, "");
        props.setCurrentRoom(prevVal => ({...prevVal, [props.property]: update}));
    }

    function handleIncrement(event) {
        let update = parseFloat(props.currentRoom[props.property]);
        if (event.currentTarget.dataset.type == "plus") {
            update = update + 1;
        } else if (event.currentTarget.dataset.type == "minus" && update > 0) {
            update = update - 1;
        }
        props.setCurrentRoom(prevVal => ({...prevVal, [props.property]: update}));
    }

    return (
        <div className="container bg-secondary text-start p-2 rounded">
            <div className="row align-items-center justify-content-between">
                <div className="col align-self-center">
                    <h3 className="d-inline-block">{props.label}</h3>
                    {props.infoText && <Info text={props.infoText} />}
                </div>
                <div className="col-auto">
                    <div className="input-group align-items-center">
                        <button type="button" className="btn btn-primary" data-type="minus" onClick={handleIncrement}>
                            <FontAwesomeIcon icon={faMinus} data-type="minus" />
                        </button>
                        <input type="text" style={{"max-width": "4rem"}} className="form-control input-number bg-white" value={props.currentRoom[props.property]} onChange={handleQuantity} />
                        <button type="button" className="btn btn-primary" data-type="plus" onClick={handleIncrement} >
                            <FontAwesomeIcon icon={faPlus} data-type="plus" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Quantity;

//