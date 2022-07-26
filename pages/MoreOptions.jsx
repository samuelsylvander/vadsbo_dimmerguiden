import React, { useContext } from "react";
import { ProjectDataContext } from "../libs/ProjectDataContext";
import { ProjectTemplateContext } from "../libs/ProjectTemplateContext";
import SwitchButtons from "../components/SwitchButtons";

function MoreOptions({ setAppState }) {
	const { projectData } = useContext(ProjectDataContext);
	const { projectTemplate, products } = useContext(ProjectTemplateContext);
	const addonDetails = getDetails();

	function getDetails() {
		const details = projectTemplate.products.map((product) => {
			const lookup = products.find((lookup) => lookup.id === product.id);
			return { ...product, ...lookup };
		});
		return details;
	}

	function handleSave() {
		setAppState("summary");
	}

	return (
		<>
			<div className='container-fluid text-center'>
				<h1 className='py-4'>Möjliga tillval</h1>
				{addonDetails.map((addon, index) => (
					<>
						{addon.required === false && (
							<SwitchButtons
								key={index}
								label={addon.name}
								buttonLabels={["Yes", "No"]}
								description={addon.description}
								field={`products.${index}.selected`}
								options={[true, false]}
							/>
						)}
					</>
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
