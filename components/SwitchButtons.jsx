import React, { useContext } from "react";
import { ProjectDataContext } from "../libs/ProjectDataContext";
import Info from "./Info";

//props required
// label
// options - array containing options to display. Will be written to var field
// field - reference to the field in projectData these buttons will set, ex: 'rooms.2.sensor'
// (images - array containing images to display. Not required, but will replace options on button display)
// infoText - in case more information is needed

function SwitchButtons({ label, options, field, infoText, images }) {
	const { projectData, dispatch } = useContext(ProjectDataContext);

	function handleSwitch(event) {
		const buttonValue = event.currentTarget.dataset.option;
		dispatch({ type: "replace", field: field, value: buttonValue });
		const siblings = event.target.parentElement.children;
		for (let i = 0; i < siblings.length; i++) {
			if (siblings[i] === event.target) {
				siblings[i].classList.remove("btn-outline-dark");
				siblings[i].classList.add("btn-primary");
			} else {
				siblings[i].classList.add("btn-outline-dark");
				siblings[i].classList.remove("btn-primary");
			}
		}
	}

	return (
		<div className='container'>
			<h3 className='d-inline-block my-4'>{label}</h3>
			{infoText && <Info text={infoText} />}
			<div>
				{options.map((option, index) => {
					return (
						<button
							key={index}
							height='2rem'
							data-option={option}
							className='btn btn-outline-dark mx-2 p-2 px-3'
							// if changing class, change it in handleSwitch above
							onClick={handleSwitch}
						>
							{images ? images[index] : option}
						</button>
					);
				})}
			</div>
		</div>
	);
}

export default SwitchButtons;
