import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function OptionsList(props) {
    function handleDetails() {
        let info = document.getElementById("optionsdetails");
        if (info.style.maxHeight === "0px") {
            info.style.maxHeight = "10.5rem";
        } else {
            info.style.maxHeight = "0px";
            setTimeout( ()=> info.style.padding = "0px", 300);            
        }
    };

    return(
    <>
        <div className="container bg-secondary mb-0" onClick={handleDetails}>
            <div className="row align-items-center justify-content-between">
                <div className="col align-self-center">
                    <h3>
                        Options
                    </h3>
                </div>
                <div className="col-auto" >
                    <FontAwesomeIcon icon={faChevronDown} />
                </div>
            </div>
        </div>
        <div id={"optionsdetails"} className="bg-white collapsable mt-0">
            <div className="row p-2">
                <div className="col fs-5">
                    Batteri-backup: <strong>{props.options.battery}</strong><br/>
                    Vadsbox Boka: <strong>{props.options.boka}</strong><br/>
                    Vadsbox Larm: <strong>{props.options.larm}</strong><br/>
                    Driftsättning: <strong>{props.options.drift}</strong><br/>
                </div>
                <div className="col">
                    <div className="text-end fs-4" onClick={props.edit}>
                    Edit <FontAwesomeIcon icon={faPenToSquare} />
                    </div>
                    <div className="text-end fs-4" onClick={props.delete}>
                    Delete <FontAwesomeIcon icon={faTrashCan} />
                    </div>
                </div>
            </div>
            
        </div>
        
        </>
    )
}