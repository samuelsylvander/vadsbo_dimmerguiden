import React, { useContext, useState } from "react";
import { ProjectDataContext } from "../libs/ProjectDataContext";
import Info from "./Info";

export default function Addon({ name, description, icon }) {
	const [selected, setSelected] = useState(false);
	const { dispatch } = useContext(ProjectDataContext);

	function handleSelectYes() {
		dispatch({ action: "select", field: "addons.id" });
	}
	return (
		<div className='row pt-4 justify-content-center'>
			<Image src={icon} />
			<div className='container'>
				<h3 className='d-inline-block my-4'>{name}</h3>
				{description && <Info text={description} />}
				<div>
					<button
						className={selected ? "btn btn-primary mx-2 p-2 px-3" : "btn btn-outline-dark mx-2 p-2 px-3"}
						onClick={handleSelectYes}
					>
						Ja
					</button>
					<button
						className={!selected ? "btn btn-primary mx-2 p-2 px-3" : "btn btn-outline-dark mx-2 p-2 px-3"}
						onClick={handleSelectNo}
					>
						Nej
					</button>
				</div>
			</div>
		</div>
	);
}
