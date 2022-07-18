import React, { useContext, useEffect, useState } from "react";
import { ProjectDataContext } from "../libs/ProjectDataContext";
import Image from "next/image";
import Info from "./Info";

export default function Addon({ name, description, value, icon, field }) {
	const [selected, setSelected] = useState(false);
	const { dispatch, projectData } = useContext(ProjectDataContext);

	useEffect(() => {
		if (projectData.addons.some((addon) => addon.id === value.id)) {
			setSelected(true);
		}
	}, []);

	function handleSelectYes() {
		setSelected(true);
		dispatch({ type: "add", field: field, value: value });
	}

	function handleSelectNo() {
		setSelected(false);
		dispatch({ type: "remove", field: field, value: value });
	}
	return (
		<div className='row pt-4 justify-content-center'>
			{icon && <Image src={icon} />}
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
