import React, { useContext, useEffect, useMemo, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { ProjectDataContext } from "../libs/ProjectDataContext";
import { ProjectTemplateContext } from "../libs/ProjectTemplateContext";
import { Collapse } from "bootstrap";

export default function OptionsList({ label, handleEdit, handleDelete }) {
	const collapseRef = useRef();
	const chevronRef = useRef();
	const { projectData } = useContext(ProjectDataContext);
	const projectTemplate = useContext(ProjectTemplateContext);
	const selectedAddonDetails = useMemo(() => {
		const selectedAddons = projectData.addons;
		const selectedAddonDetails = selectedAddons.map((selected) =>
			projectTemplate.addons.find((product) => product.id === selected.id)
		);
		return selectedAddonDetails;
	}, [projectData, projectTemplate]);

	useEffect(() => {
		collapseRef.current = new Collapse(document.getElementById("optionsdetails"));
	});

	function handleCollapse() {
		if (document.getElementById("optionsdetails").classList.contains("show")) {
			chevronRef.current.style.transform = "rotate(0deg)";
		} else {
			chevronRef.current.style.transform = "rotate(180deg)";
		}
		collapseRef.current.toggle();
	}

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
							onClick={handleCollapse}
							className='btn btn-primary'
							type='button'
							aria-expanded='false'
							aria-controls='#optionsdetails'
						>
							<div ref={chevronRef} style={{ transition: "all 300ms", transform: "rotate(0)" }}>
								<FontAwesomeIcon icon={faChevronDown} />
							</div>
						</button>
					</div>
				</div>
				<div id='optionsdetails' className='collapse p-0'>
					<div className='card-body pb-0'>
						{selectedAddonDetails.map((addon) => (
							<p>{addon.name}</p>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
