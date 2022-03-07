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
        event.stopPropagation()
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

    return (
        <>
        <div className="card bg-secondary mb-4 p-3">
            <div className="row align-items-center">
                <div className="col align-self-center">
                    <h3 className="mb-0">{props.label}</h3>
                </div>
                <div className="col-3">
                    <div className="input-group ms-auto">
                        <button type="button" className="btn btn-primary" data-type="minus" onClick={handleIncrement}>
                            <FontAwesomeIcon icon={faMinus} data-type="minus" />
                        </button>
                        <input type="text" className="form-control input-number bg-white text-center" value={props.roomList[props.index].noOfRooms} onChange={handleQuantity} onClick={event=>event.stopPropagation()}/>
                        <button type="button" className="btn btn-primary" data-type="plus" onClick={handleIncrement} >
                            <FontAwesomeIcon icon={faPlus} data-type="plus" />
                        </button>
                    </div>
                </div>
                <div className="col-auto">
                    <a className="text-dark me-2" onClick={()=>props.loadRoom(props.label)}><FontAwesomeIcon icon={faPenToSquare} /></a>
                    <a className="text-dark me-2" onClick={()=>props.deleteRoom(props.index)}><FontAwesomeIcon icon={faTrashCan} /></a>
                    
                    <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target={"summarydetails" + props.index} aria-expanded="false" aria-controls={"summarydetails" + props.index}><FontAwesomeIcon icon={faChevronDown} /></button>
                </div>
            </div>
            <div className="card-body " id={"summarydetails" + props.index}>
                Hur armaturerna kontrolleras: <strong>{props.roomList[props.index].app}</strong><br/>
                Antal armaturer: <strong>{props.roomList[props.index].lights}</strong><br/>
                Antal knappar: <strong>{props.roomList[props.index].switches}</strong>
            </div>
        </div>
        </>
    )
    
};

export default RoomQuantity;