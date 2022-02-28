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

    return (
        <div className="d-flex flex-column justify-content-between h-100 fs-4">
            <div id="basket-items" className="text-white flex-grow-1 mt-5">
                <ul className="list-unstyled p-3">
                    {Object.keys(basketItems).map(key => {
                        if (basketItems[key] > 0) {
                            return <BasketItem key={key} item={key} quantity={basketItems[key]}/>
                        }
                    })}
                    <li className="p-2">
                        <h4 className="mt-3">Selected Options:</h4>
                        {Object.keys(props.options)
                            .filter(option => props.options[option]==="Ya")
                            .map(option => <p className="my-1">{optionLookup[option]}</p>)
                        }
                    </li> 
                </ul>
            </div>

            <div id="basket-buttons" className="w-100">
                <div id="contact" className="container m-0 bg-info" onClick={()=> props.setAppState("getquote")}>
                    <FontAwesomeIcon icon={faDollarSign} /> Get a Quote
                </div>
                <div id="pdf" className="container m-0 bg-primary">
                    <FontAwesomeIcon icon={faFilePdf} /> Create PDF
                </div>
            </div>
        </div>
    )
};

export default Sidebar