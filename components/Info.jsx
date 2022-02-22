import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {useState} from "react";


export default function Info(props) {
    const [showInfo, setShowInfo] = useState(false);

    return (
        <>
            <FontAwesomeIcon className="text-info m-1 fs-5" icon={faCircleInfo} onClick={()=> setShowInfo(prevVal => !prevVal)}/>
            <br/>
            {showInfo && <div className="bg-info">
                {props.text}
            </div> }
        </>
    )
}