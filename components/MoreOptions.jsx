import React, { useContext } from "react";
import { ProjectDataContext } from "../libs/ProjectDataContext";
import { ProjectTemplateContext } from "../libs/ProjectTemplateContext";
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
					// <div className='row pt-4 justify-content-center'>
					<SwitchButtons
						infoText={addon.description}
						key={addon.name}
						label={addon.name}
						buttonLabels={["Yes", "No"]}
						options={[
							{ id: addon.id, quantity: 1 },
							{ id: addon.id, quantity: 0 },
						]}
						field={`addons`}
					/>
					// </div>
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
