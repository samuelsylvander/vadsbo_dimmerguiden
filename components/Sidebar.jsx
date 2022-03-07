import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import algorithm from "../libs/algorithm";
import BasketItem from "./BasketItem";

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
        <div className="d-flex flex-column h-100">
            <div id="basket-items" className="text-white flex-grow-1 p-2">
                <h2 className="text-center pt-2 pb-4">Plocklista</h2>
                <ul className="list-unstyled p-2">
                    {Object.keys(basketItems).map(key => {
                        if (basketItems[key] > 0) {
                            return <BasketItem key={key} item={key} quantity={basketItems[key]}/>
                        }
                    })}
                    <li>
                        {filteredOptions.length > 0 && <>
                            <h4 className="mt-5">Tillval</h4>
                            {filteredOptions.map(option => <p className="my-1">{optionLookup[option]}</p>)}
                        </>}
                    </li> 
                </ul>
            </div>

            <div id="basket-buttons" className="w-100">
                <div id="contact" className="container m-0 py-4 bg-info" onClick={()=> props.setAppState("getquote")}>
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