import React, { useContext, useRef, useState } from "react";
import Info from "./Info";
import Image from "next/image";
import { ProjectTemplateContext } from "../libs/ProjectTemplateContext";
import { ProjectDataContext } from "../libs/ProjectDataContext";

export default function NewRoom({ setAppState, roomIndex }) {
	const { projectData, dispatch } = useContext(ProjectDataContext);
	const projectTemplate = useContext(ProjectTemplateContext);
	const [inputCompleteFlag, setInputCompleteFlag] = useState(false);
	const templateParent = useRef();

	function handleSaveRoom() {
		setAppState("roomdetails");
	}

	function handleSelectTemplate(e, selectedTemplate) {
		setInputCompleteFlag(true);
		dispatch({ type: "replace", field: `rooms.${roomIndex}`, value: selectedTemplate });

		Array.from(templateParent.current.children).forEach((card) => {
			if (card === e.currentTarget) {
				card.classList.add("bg-primary");
			} else {
				card.classList.remove("bg-primary");
			}
		});
	}

	return (
		<div className='container-fluid text-center'>
			<h1 className='py-4'>Börja med att välja ett rum</h1>

			<p>
				Välj ett rum nedan så guidar vi dig med dina val för din belysning. Du kan enkelt lägga till fler rum
				när du är klar med ditt första.
			</p>
			<div ref={templateParent}>
				{projectTemplate.room_templates.map((template) => {
					return (
						<div className='card d-inline-block w-auto' onClick={(e) => handleSelectTemplate(e, template)}>
							<img src={template.icon} className='card-img-top' />
							<div className='card-body'>{template.name}</div>
						</div>
					);
				})}
			</div>

			<button className='btn btn-lg btn-dark w-auto my-3' onClick={handleSaveRoom} disabled={!inputCompleteFlag}>
				Spara rum
			</button>
		</div>
	);
}
