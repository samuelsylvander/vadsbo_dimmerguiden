import React, { useContext } from "react";
import { ProjectDataContext } from "../libs/ProjectDataContext";
import { ProjectTemplateContext } from "../libs/ProjectTemplateContext";
import Addon from "./Addon";

function MoreOptions({ setAppState }) {
	const projectTemplate = useContext(ProjectTemplateContext);

	function handleSave() {
		setAppState("summary");
	}

	return (
		<>
			<div className='container-fluid text-center'>
				<h1 className='py-4'>Möjliga tillval</h1>

				{projectTemplate.addons.map((addon, index) => (
					<Addon
						key={index}
						name={addon.name}
						description={addon.description}
						field={`addons`}
						value={addon}
					/>
				))}

				<br />

				<button className='btn btn-lg  btn-dark mx-3' onClick={handleSave}>
					Save Options
				</button>
			</div>
		</>
	);
}

export default MoreOptions;
