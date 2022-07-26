import React, { useContext, useEffect, useMemo, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { ProjectDataContext } from "../libs/ProjectDataContext";
import { ProjectTemplateContext } from "../libs/ProjectTemplateContext";

export default function OptionsList({ label, handleEdit }) {
	const collapseRef = useRef();
	const chevronRef = useRef();
	const { projectData } = useContext(ProjectDataContext);
	const { products } = useContext(ProjectTemplateContext);
	const addonDetails = getDetails();

	function getDetails() {
		const details = projectData.products.map((product) => {
			const lookup = products.find((lookup) => lookup.id === product.id);
			return { ...product, ...lookup };
		});
		return details;
	}

	useEffect(() => {
		//set up bootstrap collapse
		const { Collapse } = require("bootstrap");
		collapseRef.current = new Collapse(document.getElementById("optionsdetails"), { toggle: false });
	});

	function handleCollapse() {
		if (document.getElementById("optionsdetails").classList.contains("show")) {
			chevronRef.current.style.transform = "rotate(0deg)";
		} else {
			chevronRef.current.style.transform = "rotate(180deg)";
		}
		collapseRef.current.toggle();
	}

	useEffect(() => {
		//uncollapse if fewer than five rooms in project
		if (projectData.rooms.length <= 5) {
			document.getElementById("optionsdetails").classList.add("show");
			chevronRef.current.style.transform = "rotate(180deg)";
		}
		requestAnimationFrame(() => (chevronRef.current.style.transition = "all 300ms"));
	}, [projectData.rooms.length]);

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
						{/* <a className='text-dark me-2' onClick={handleDelete}>
							<FontAwesomeIcon icon={faTrashCan} />
						</a> */}
						<button
							onClick={handleCollapse}
							className='btn btn-primary'
							type='button'
							aria-expanded='false'
							aria-controls='#optionsdetails'
						>
							<div ref={chevronRef}>
								<FontAwesomeIcon icon={faChevronDown} />
							</div>
						</button>
					</div>
				</div>
				<div id='optionsdetails' className='collapse p-0'>
					<div className='card-body pb-0'>
						{addonDetails.map(
							(product, index) =>
								(product.required === true || product.selected === true) && (
									<p key={index}>
										{product.name + ": "}
										<strong>{product.quantity}</strong>
										{/* {product?.options?.brand && <em>{" " + product.options.brand + ", "}</em>}
										{product?.options?.color && <em>{" " + product.options.color}</em>} */}
									</p>
								)
						)}
					</div>
				</div>
			</div>
		</>
	);
}
