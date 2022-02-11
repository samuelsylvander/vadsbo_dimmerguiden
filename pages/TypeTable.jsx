import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney, faBuilding, faPhone } from "@fortawesome/free-solid-svg-icons";

function TypeTable(props) {
    return (
        <p>
        <h2>Type of room</h2>
        <table className="table table-hover">
            <tbody>
            <tr>
                <td>
                    <FontAwesomeIcon icon={faHouseChimney} />
                </td>
                <td>
                    Home
                </td>
            </tr>
            <tr>
                <td>
                    <FontAwesomeIcon icon={faBuilding} />
                </td>
                <td>
                    Building
                </td>
            </tr>
            <tr>
                <td>
                    <FontAwesomeIcon icon={faPhone} />
                </td>
                <td>
                    Office
                </td>
            </tr>
            </tbody>
        </table>
        </p>
    )
}

export default TypeTable