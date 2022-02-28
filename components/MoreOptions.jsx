import React, { useEffect, useState } from "react";
import SwitchButtons from "./SwitchButtons";

function MoreOptions(props) {

    return (
        <>
            <SwitchButtons 
                property="battery" 
                currentRoom={props.options}
                setCurrentRoom={props.setOptions} 
                label="Batteri-backup" 
                field={["Ya", "Nej"]}
                infoText="Info text here"
            />
            <SwitchButtons 
                property="alarm" 
                currentRoom={props.options}
                setCurrentRoom={props.setOptions} 
                label="Larmkoppling" 
                field={["Ya", "Nej"]}
                infoText="Info text here"
            />
            {/* {props.options.ipad == "Ya" && <Quantity 
                property="ipadnum"
                currentRoom={props.options}
                setCurrentRoom={props.setOptions}
                label="Quantity"
            />} */}
            <SwitchButtons 
                property="boka" 
                currentRoom={props.options}
                setCurrentRoom={props.setOptions} 
                label="Vadsbox Boka" 
                field={["Ya", "Nej"]}
                infoText="Info text here"
            />
            <SwitchButtons 
                property="larm" 
                currentRoom={props.options}
                setCurrentRoom={props.setOptions} 
                label="Vadsbox Larm" 
                field={["Ya", "Nej"]}
                infoText="Info text here"
            />
            <SwitchButtons 
                property="drift" 
                currentRoom={props.options}
                setCurrentRoom={props.setOptions} 
                label="Driftsättning" 
                field={["Ya", "Nej"]}
                infoText="Info text here"
            />
          
            {Object.keys(props.options).length > 4 && <button className="button btn-dark" onClick={()=>props.setAppState("summary")}>Save Options</button>}
            {JSON.stringify(props.options)}
        </>
    )
};

export default MoreOptions