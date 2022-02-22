import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

function Header() {
    return (
        <nav className="navbar navbar-light bg-primary">
            <span className="navbar-brand">Vadsbo</span>
            <FontAwesomeIcon icon={faLink} />
        </nav>
    )
}

export default Header;