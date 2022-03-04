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
        <div className="container bg-secondary p-3" onClick={handleDetails}>
            <div className="row align-items-center">
                <div className="col">
                    <h3 className="mb-0">Tillval</h3>
                </div>
                <div className="col-auto" >
                    <a className="text-dark me-2" onClick={props.edit}><FontAwesomeIcon icon={faPenToSquare} /></a>
                    <a className="text-dark me-2" onClick={props.delete}><FontAwesomeIcon icon={faTrashCan} /></a>
                    <FontAwesomeIcon icon={faChevronDown} />
                </div>
            </div>
        </div>
        <div id={"optionsdetails"} className="bg-white collapse">
            <div className="row p-2">
                <div className="col">
                    Batteri-backup: <strong>{props.options.battery}</strong><br/>
                    Vadsbox Boka: <strong>{props.options.boka}</strong><br/>
                    Vadsbox Larm: <strong>{props.options.larm}</strong><br/>
                    Driftsättning: <strong>{props.options.drift}</strong><br/>
                </div>
            </div>
        </div>
        
        </>
    )
}