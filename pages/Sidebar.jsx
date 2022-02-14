import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faFilePdf } from "@fortawesome/free-solid-svg-icons";

function Sidebar(props) {
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
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
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