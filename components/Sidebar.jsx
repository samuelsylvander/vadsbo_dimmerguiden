import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faFilePdf, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import algorithm from "../libs/algorithm";

function Sidebar(props) {
    const basketItems = algorithm(props.roomList);
    const optionLookup = {
        battery: "Batteri-backup",
        alarm: "Larmkoppling",
        boka: "Vadsbox Boka",
        larm: "Vadsbox Larm",
        drift: "Driftsättning"
    };
    const filteredOptions = Object.keys(props.options).filter(option => props.options[option]==="Ja")

    return (
        <div className="d-flex flex-column h-100 m-0">
            <div id="basket-items" className="text-white flex-grow-1 p-2">
                <h2 className="text-center pt-2 pb-4">Plocklista</h2>
                <ul className="list-unstyled p-2">
                    {Object.keys(basketItems).map(item => {
                        if (basketItems[item] > 0) {
                            return (
                                <li className="mb-4" key={item}>
                                    <h4>
                                        {item} <FontAwesomeIcon icon={faCircleInfo} onClick={()=> props.showDetails(item)} />
                                    </h4>
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            Antal
                                        </div>
                                        <div>
                                            {basketItems[item]}
                                        </div>
                                    </div>
                                </li>
                            )
                        }
                    })}
                    <li>
                        {filteredOptions.length > 0 && <>
                            <h4 className="mt-5">Tillval</h4>
                            {filteredOptions.map(option => <p className="my-1" key={option}>{optionLookup[option]}</p>)}
                        </>}
                    </li> 
                </ul>
            </div>

            <div id="basket-buttons" className="w-100">
                <div id="contact" className="container m-0 py-4 bg-info" data-bs-toggle="modal" data-bs-target="#getQuote">
                    <FontAwesomeIcon icon={faDollarSign} /> Be om offert
                </div>
                <div id="pdf" className="container m-0 py-4 bg-primary">
                    <FontAwesomeIcon icon={faFilePdf} /> Spara PDF
                </div>
            </div>
        </div>
    )
};

export default Sidebar