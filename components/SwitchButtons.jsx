import React, { useContext, useEffect, useRef } from "react";
import { ProjectDataContext } from "../libs/ProjectDataContext";
import Info from "./Info";

//props required
// label
// buttonLabels - if not passed, will show options instead
// options - array containing options to display. Will be written to var field
// field - reference to the field in projectData these buttons will set, ex: 'rooms.2.sensor'
// (images - array containing images to display. Not required, but will replace options on button display)
// infoText - in case more information is needed
// multiple - flag to add if you want to allow multiple values to be selected

function SwitchButtons({ label, buttonLabels, options, field, infoText, images, multiple }) {
	const { projectData, dispatch } = useContext(ProjectDataContext);
	const parentRef = useRef();
	const buttonLabelsValue = useRef();

	useEffect(() => {
		if (buttonLabelsValue.current !== JSON.stringify(buttonLabels)) {
			buttonLabelsValue.current = JSON.stringify(buttonLabels);
			const siblings = Array.from(parentRef.current.children);
			siblings.forEach((sibling) => (sibling.dataset.selected = "false"));
			setClasses(siblings);
		}
	}, [buttonLabels]);

	useEffect(() => {
		//update which buttons are selected each time projectData changes
		const buttons = Array.from(parentRef.current.children);
		let currentField = projectData;
		const fieldValuesArray = field.split(".");
		fieldValuesArray.forEach((field) => {
			currentField = currentField[field];
		});
		if (Array.isArray(currentField)) {
			buttons.forEach((button, index) => {
				if (
					currentField.includes(options[index]) ||
					currentField.some((item) => item.id === options[index].id)
				) {
					button.dataset.selected = "true";
				} else {
					button.dataset.selected = "false";
				}
			});
		} else {
			buttons.forEach((button, index) => {
				if (currentField === options[index]) {
					button.dataset.selected = "true";
				} else {
					button.dataset.selected = "false";
				}
			});
		}
		setClasses(buttons);
	}, [projectData]);

	function handleSwitch(event) {
		const button = event.target;
		if (button.dataset.selected === "false") {
			if (multiple) {
				dispatch({ type: "add", field: field, value: options[parseFloat(button.dataset.index)] });
			} else {
				dispatch({ type: "replace", field: field, value: options[parseFloat(button.dataset.index)] });
			}
		} else if (button.dataset.selected === "true" && multiple) {
			dispatch({ type: "remove", field: field, value: options[parseFloat(button.dataset.index)] });
		}
	}

	function setClasses(buttons) {
		//set classes for selected and non-selected buttons
		buttons.forEach((sibling) => {
			if (sibling.dataset.selected === "true") {
				sibling.classList.remove("btn-outline-dark");
				sibling.classList.add("btn-primary");
			} else {
				sibling.classList.add("btn-outline-dark");
				sibling.classList.remove("btn-primary");
			}
		});
	}

	return (
		<div className='container'>
			<h3 className='d-inline-block my-4'>{label}</h3>
			{infoText && <Info text={infoText} />}
			<div ref={parentRef} className='switch-buttons'>
				{options.map((option, index) => {
					return (
						<button
							key={index}
							height='2rem'
							data-index={index}
							data-selected={false}
							className='btn btn-outline-dark mx-2 p-2 px-3'
							// if changing class, don't forget to change it in setClasses above
							onClick={handleSwitch}
						>
							{images ? images[index] : buttonLabels ? buttonLabels[index] : JSON.stringify(option)}
						</button>
					);
				})}
			</div>
		</div>
	);
}

export default SwitchButtons;
