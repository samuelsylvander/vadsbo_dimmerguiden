import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function OptionsList(props) {
    return(
    <>
        <div className="card bg-secondary mb-4 p-3">
            <div className="row align-items-center">
                <div className="col">
                    <h3 className="mb-0">Tillval</h3>
                </div>
                <div className="col-auto" >
                    <a className="text-dark me-2" onClick={props.edit}><FontAwesomeIcon icon={faPenToSquare} /></a>
                    <a className="text-dark me-2" onClick={props.delete}><FontAwesomeIcon icon={faTrashCan} /></a>
                    <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#optionsdetails" aria-expanded="false" aria-controls={"summarydetails" + props.index}><FontAwesomeIcon icon={faChevronDown} /></button>
                </div>
            </div>
            <div id="optionsdetails" className="collapse p-0">
                <div className="card-body">
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