import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function OptionsList(props) {
    function handleDetails() {
        let info = document.getElementById("optionsdetails");
        if (info.style.maxHeight === "0px") {
            info.style.maxHeight = "300px";
            info.style.padding = null;
        } else {
            info.style.maxHeight = "0px";
            setTimeout( ()=> info.style.padding = "0px", 300);            
        }
    };

    return(
    <>
        <div className="container bg-primary mb-0">
            <div className="row align-items-center justify-content-between">
                <div className="col align-self-center"><h3>{props.label}</h3></div>
                <div className="col-auto" onClick={handleDetails}>
                    <FontAwesomeIcon icon={faChevronDown} />
                </div>
            </div>
        </div>
        <div id={"optionsdetails"} className="container bg-info collapsable mt-0">
            <div className="row">
                <div className="col fs-5">
                    Batteribackup: <strong>{props.options.battery}</strong><br/>
                    iPad: <strong>{props.options.ipad}</strong> {props.options.ipad=="Ya" && <span>Number: <strong>{props.options.ipadnum}</strong></span>}<br/>
                    Startklarpaket: <strong>{props.options.starter}</strong><br/>
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