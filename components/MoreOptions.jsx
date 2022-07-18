import React, { useContext } from "react";
import { ProjectDataContext } from "../libs/ProjectDataContext";
import { ProjectTemplateContext } from "../libs/ProjectTemplateContext";
import Addon from "./Addon";
import SwitchButtons from "./SwitchButtons";

function MoreOptions({ setAppState }) {
	const { projectData, dispatch } = useContext(ProjectDataContext);
	const projectTemplate = useContext(ProjectTemplateContext);
	const selectedOptions = getAddonDetails();

	function getAddonDetails() {
		const currentOptionsArray = projectData.addons;
		const optionsDetailsArray = currentOptionsArray.map((option) =>
			projectTemplate.products.find((product) => product.id === option)
		);
		return optionsDetailsArray;
	}

	function handleSave() {
		setAppState("summary");
	}

	return (
		<>
			<div className='container-fluid text-center'>
				<h1 className='py-4'>Möjliga tillval</h1>

				{projectTemplate.addons.map((addon) => (
					<Addon name={addon.name} description={addon.description} field={`addons`} value={addon} />
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
