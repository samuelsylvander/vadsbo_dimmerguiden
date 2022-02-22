import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import algorithm from "../libs/algorithm";
import BasketItem from "./BasketItem";

function Sidebar(props) {
    const basketItems = algorithm(props.roomList)

    function openSidebar() {
        const basket = document.getElementById("basket");
        if (basket.style.right == "0px") {
            basket.style.right = "-300px";
        } else {
            basket.style.right = "0px";
        }
    }

    return (
        <div id="basket">
            <div id="basket-items">
                <ul>
                    {Object.keys(basketItems).map(key => {
                        if (basketItems[key] > 0) {
                            return <BasketItem item={key} quantity={basketItems[key]}/>
                        }
                    })}
                </ul>
            </div>


            <div id="basket-buttons">
                <div id="contact" className="container">
                    <FontAwesomeIcon icon={faDollarSign} /> Get a Quote
                </div>
                <div id="pdf" className="container">
                    <FontAwesomeIcon icon={faFilePdf} /> Create PDF
                </div>
            </div>
            <div id="sidebar-button" onClick={openSidebar}>
                <FontAwesomeIcon icon={faDollarSign} />
            </div>
        </div>
    )
};

export default Sidebar