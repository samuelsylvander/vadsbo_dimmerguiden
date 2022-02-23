import React from "react";
import Quantity from "./Quantity";
import SwitchButtons from "./SwitchButtons";

function MoreOptions(props) {
    return (
        <>
            <SwitchButtons 
                property="battery" 
                currentRoom={props.options}
                setCurrentRoom={props.setOptions} 
                label="Batteribackup" 
                field={["Ya", "Nej"]}
                infoText="Info text here"
            />
            <SwitchButtons 
                property="ipad" 
                currentRoom={props.options}
                setCurrentRoom={props.setOptions} 
                label="iPad med förinstallerat Casambi" 
                field={["Ya", "Nej"]}
                infoText="Info text here"
            />
            {props.options.ipad == "Ya" && <Quantity 
                property="ipadnum"
                currentRoom={props.options}
                setCurrentRoom={props.setOptions}
                label="Quantity"
            />}
            <SwitchButtons 
                property="starter" 
                currentRoom={props.options}
                setCurrentRoom={props.setOptions} 
                label="Startklarpaket" 
                field={["Ya", "Nej"]}
                infoText="Info text here"
            />
          
            <button className="button btn-dark" onClick={()=>props.setAppState("summary")}>Save Options</button>
        </>
    )
};

export default MoreOptions