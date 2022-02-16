import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faChevronDown, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

// props required:
// index: index of current room in roomList
// roomList: object to edit, controls input field
// setRoomList: function used to edit roomDetails
// label: what to display

function RoomQuantity(props) {

    function handleQuantity(event) {
        let update = event.target.value.replace(/\D/, "");
        props.setRoomList(prevVal => {
            let temp = [...prevVal];
            temp[props.index].noOfRooms = update;
            return temp;
        });
    }

    function handleIncrement(event) {
        let update = parseFloat(props.roomList[props.index].noOfRooms);
        if (event.currentTarget.dataset.type == "plus") {
            update = update + 1;
        } else if (event.currentTarget.dataset.type == "minus" && update > 1) {
            update = update - 1;
        }
        props.setRoomList(prevVal => {
            let temp = [...prevVal];
            temp[props.index].noOfRooms = update;
            return temp;
        });
    }

    function handleDetails() {
        let info = document.getElementById("summarydetails" + props.index);
        if (info.style.height === "0px") {
            info.style.height = "auto";
            info.style.padding = null;
        } else {
            info.style.height = "0px";
            info.style.padding = "0px";
        }
    }

    return (
        <>
        <div className="container bg-primary mb-0">
            <div className="row align-items-center justify-content-between">
                <div className="col align-self-center"><h3>{props.label}</h3></div>
                <div className="col-auto">
                    <div className="input-group align-items-center">
                        <button type="button" className="btn btn-success" data-type="minus" onClick={handleIncrement}>
                            <FontAwesomeIcon icon={faMinus} data-type="minus" />
                        </button>
                        <input type="text" className="form-control input-number" value={props.roomList[props.index].noOfRooms} onChange={handleQuantity} />
                        <button type="button" className="btn btn-success" data-type="plus" onClick={handleIncrement} >
                            <FontAwesomeIcon icon={faPlus} data-type="plus" />
                        </button>
                    </div>
                </div>
                <div className="col-auto" onClick={handleDetails}>
                    <FontAwesomeIcon icon={faChevronDown} />
                </div>
            </div>
        </div>
        <div id={"summarydetails" + props.index} className="container bg-info collapsable mt-0">
            <div className="row">
                <div className="col fs-5">
                    Room Name: <strong>{props.roomList[props.index].name}</strong><br/>
                    Controlled by: <strong>{props.roomList[props.index].app}</strong><br/>
                    Number of Lights: <strong>{props.roomList[props.index].lights}</strong><br/>
                    Number of Switches: <strong>{props.roomList[props.index].switches}</strong>
                </div>
                <div className="col">
                    <div className="text-end fs-4">
                    Edit <FontAwesomeIcon icon={faPenToSquare} />
                    </div>
                    <div className="text-end fs-4">
                    Delete <FontAwesomeIcon icon={faTrashCan} />
                    </div>
                </div>
            </div>
            
        </div>
        
        </>
    )
};

export default RoomQuantity;

//