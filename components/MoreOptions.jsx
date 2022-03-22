import React from "react";
import SwitchButtons from "./SwitchButtons";

function MoreOptions(props) {

    return (
        <>
            <div className="container-fluid text-center">
                <h1 className="py-4">Möjliga tillval</h1>

                <div className="row pt-4 justify-content-center">
                    <SwitchButtons 
                        property="battery" 
                        currentRoom={props.options}
                        setCurrentRoom={props.setOptions} 
                        label="Batteri-backup" 
                        field={["Ja", "Nej"]}
                        infoText="Info text here"
                    />
                </div>
                <div className="row pt-4 justify-content-center">
                    <SwitchButtons 
                        property="boka" 
                        currentRoom={props.options}
                        setCurrentRoom={props.setOptions} 
                        label="Vadsbox Boka" 
                        field={["Ja", "Nej"]}
                        infoText="Info text here"
                    />
                </div>
                <div className="row pt-4 justify-content-center">
                    <SwitchButtons 
                        property="larm" 
                        currentRoom={props.options}
                        setCurrentRoom={props.setOptions} 
                        label="Vadsbox Larm" 
                        field={["Ja", "Nej"]}
                        infoText="Info text here"
                    />
                </div>
                <div className="row pt-4 justify-content-center">
                    <SwitchButtons 
                        property="drift" 
                        currentRoom={props.options}
                        setCurrentRoom={props.setOptions} 
                        label="Driftsättning" 
                        field={["Ja", "Nej"]}
                        infoText="Info text here"
                    />
                </div>
                <div className="row pt-4 justify-content-center">
                    {Object.keys(props.options).length > 3 && <button className="btn btn-lg btn-dark col-auto" onClick={()=>props.setAppState("summary")}>Spara tillval</button>}
                </div>
            </div>
        </>
    )
};

export default MoreOptions