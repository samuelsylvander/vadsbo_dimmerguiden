import React, { useContext, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { ProjectDataContext } from "../libs/ProjectDataContext";
import { ProjectTemplateContext } from "../libs/ProjectTemplateContext";

export default function OptionsList({ label, handleEdit, handleDelete, addons }) {
	const { projectData } = useContext(ProjectDataContext);
	const projectTemplate = useContext(ProjectTemplateContext);
	const selectedAddonDetails = useMemo(() => {
		const selectedAddons = projectData.addons;
		const selectedAddonDetails = selectedAddons.map((selected) =>
			projectTemplate.addons.find((product) => product.id === selected.id)
		);
		return selectedAddonDetails;
	}, [projectData, projectTemplate]);

	return (
		<>
			<div className='card bg-secondary mb-4 p-3'>
				<div className='row align-items-center'>
					<div className='col'>
						<h3 className='mb-0'>{label}</h3>
					</div>
					<div className='col-auto'>
						<a className='text-dark me-2' onClick={handleEdit}>
							<FontAwesomeIcon icon={faPenToSquare} />
						</a>
						<a className='text-dark me-2' onClick={handleDelete}>
							<FontAwesomeIcon icon={faTrashCan} />
						</a>
						<button
							className='btn btn-primary'
							type='button'
							data-bs-toggle='collapse'
							data-bs-target='#optionsdetails'
							aria-expanded='false'
							aria-controls='#optionsdetails'
						>
							<FontAwesomeIcon icon={faChevronDown} />
						</button>
					</div>
				</div>
				<div id='optionsdetails' className='collapse p-0'>
					<div className='card-body'>
						{selectedAddonDetails.map((addon) => (
							<p>{addon.name}</p>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
