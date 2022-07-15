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
		dispatch({ type: "replace", field: `rooms`, value: selectedTemplate });

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

			<div className='row pt-4 justify-content-center'>
				<div className='col-auto'>
					<label>
						<h3 className='d-inline-block mb-2'>Ge rummet ett namn</h3>

						<Info text={"Välj ett passande namn till rummet."} />
						<input
							className='form-control bg-white'
							type='text'
							placeholder='T ex Kontor'
							value={projectData.rooms[roomIndex] ? projectData.rooms[roomIndex].name : "new room"}
							onChange={(event) =>
								dispatch({
									type: "replace",
									field: `rooms.${roomIndex}.name`,
									value: event.target.value,
								})
							}
							required
						/>
					</label>
					<br />
					<button
						className='btn btn-lg btn-dark w-auto my-3'
						onClick={handleSaveRoom}
						disabled={!inputCompleteFlag}
					>
						Spara rum
					</button>
				</div>
			</div>
		</div>
	);
}
