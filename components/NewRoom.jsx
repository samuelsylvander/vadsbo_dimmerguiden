import React, { useContext, useRef, useState } from "react";
import Image from "next/image";
import { ProjectTemplateContext } from "../libs/ProjectTemplateContext";
import { ProjectDataContext } from "../libs/ProjectDataContext";

export default function NewRoom({ setAppState, roomIndex }) {
	const { dispatch } = useContext(ProjectDataContext);
	const projectTemplate = useContext(ProjectTemplateContext);
	const [inputCompleteFlag, setInputCompleteFlag] = useState(false);
	const templateParent = useRef();

	function handleSaveRoom() {
		setAppState("roomdetails");
	}

	function handleSelectTemplate(e, selectedTemplate) {
		setInputCompleteFlag(true);
		dispatch({ type: "replace", field: `rooms.${roomIndex}`, value: selectedTemplate });

		Array.from(document.getElementsByClassName("room-template")).forEach((card) => {
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
			<div className='row justify-content-center'>
				{projectTemplate.room_templates.map((template, i) => {
					return (
						<div key={i} className='col-lg-2 col-sm-3 col-6'>
							<div
								key={template.room_template_id}
								className='room-template card d-inline-block w-100 h-100'
								onClick={(e) => handleSelectTemplate(e, template)}
							>
								<Image
									src={template.photo}
									width='400px'
									height='300px'
									layout='responsive'
									className='card-img-top'
									alt={template.name}
								/>
								<div className='card-body'>
									<h5 className='card-title'>{template.name}</h5>
								</div>
							</div>
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
