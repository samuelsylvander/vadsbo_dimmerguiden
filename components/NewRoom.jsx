import React, { useEffect, useContext, useState } from "react";
import Quantity from "./Quantity";
import SwitchButtons from "./SwitchButtons";
import Info from "./Info";
import daliLogo from "../public/dali-pictogram.png";
import daliRGBLogo from "../public/dali-rgb-pictogram.png";
import daliTWLogo from "../public/dali-tw-pictogram.png";
import Image from "next/image";
import { ProjectTemplateContext } from "../libs/ProjectTemplateContext";
import { ProjectDataContext } from "../libs/ProjectDataContext";

function NewRoom({ setAppState, roomIndex }) {
	const { projectData, dispatch } = useContext(ProjectDataContext);
	const projectTemplate = useContext(ProjectTemplateContext);
	const [sensorOptions, setSensorOptions] = useState([]);

	useEffect(() => {
		if (projectData.rooms && projectTemplate) {
			//use this if sensor rules vary by template
			// const currentTemplate = projectTemplate["project types"].find(
			// 	(template) => template.id === projectData.template_id
			// );

			let optionsFromTemplate = [];

			console.log(projectData.rooms[roomIndex].sensor.selected);

			if (projectData.rooms[roomIndex].sensor.selected === "true") {
				optionsFromTemplate = projectTemplate.sensor_options.yes.optional_products;
			} else if (projectData.rooms[roomIndex].sensor.selected === "false") {
				optionsFromTemplate = projectTemplate.sensor_options.no.optional_products;
			}

			const optionsDetails = optionsFromTemplate.map((option) =>
				projectTemplate.products.find((product) => product.id === option.id)
			);

			console.log(optionsDetails);
			setSensorOptions(optionsDetails);
		}
	}, [projectData, projectTemplate]);

	const daliButtons = [
		<Image src={daliLogo} height={200} width={200} key={daliLogo} alt='DALI logo' />,
		<Image src={daliTWLogo} height={200} width={200} key={daliTWLogo} alt='DALI TW logo' />,
		<Image src={daliRGBLogo} height={200} width={200} key={daliRGBLogo} alt='DALI RGB logo' />,
	];

	function handleSaveRoom() {
		setAppState("summary");
	}

	// return <div>{JSON.stringify(projectData.rooms[roomIndex])}</div>;

	return (
		<div className='container-fluid text-center'>
			<h1 className='py-4'>Lägg till ett rum</h1>

			<div className='row pt-4 justify-content-center'>
				<div className='col-auto'>
					{/* <label>
						<h3 className='d-inline-block mb-2'>Ge rummet ett namn</h3>

						<Info text={"Välj ett passande namn till rummet."} />
						<input
							className='form-control bg-white'
							type='text'
							placeholder='T ex Kontor'
							value={projectData.rooms[roomIndex].name}
							onChange={(event) =>
								dispatch({
									type: "replace",
									field: `rooms.${roomIndex}.name`,
									value: event.target.value,
								})
							}
							required
						/>
					</label> */}
					<SwitchButtons
						label='Do you need a Sensor?'
						buttonLabels={["Yes", "No"]}
						options={[true, false]}
						field={`rooms.${roomIndex}.sensor.selected`}
					/>

					<SwitchButtons
						label='Sensor options'
						buttonLabels={sensorOptions.map((option) => option?.name)}
						options={sensorOptions.map((option) => option?.id)}
						field={`rooms.${roomIndex}.sensor.products`}
						multiple
					/>

					<button className='btn btn-lg btn-dark w-auto my-3' onClick={handleSaveRoom}>
						Spara rum
					</button>
				</div>
			</div>
		</div>
	);
}

const oldNewRoomSteps = () => {
	return (
		<>
			<div className='row pt-4'>
				<SwitchButtons
					property='dali'
					currentRoom={props.currentRoom}
					setCurrentRoom={props.setCurrentRoom}
					label='Vad vill du styra?'
					images={daliButtons}
					field={["DALI", "DALI TW", "DALI RGB"]}
					infoText='Info text here'
				/>
			</div>

			<div
				id='step1'
				className={
					!(props.currentRoom.name != "" && props.currentRoom.dali != "")
						? "visually-hidden-focusable"
						: "row pt-4 justify-content-center"
				}
			>
				<Quantity
					property='lights'
					currentRoom={props.currentRoom}
					setCurrentRoom={props.setCurrentRoom}
					label='Antal armaturer'
					// infoText="Info text here"
				/>
			</div>

			<div
				id='step2'
				className={
					!(props.currentRoom.lights > 0) ? "visually-hidden-focusable" : "row pt-4 justify-content-center"
				}
			>
				<SwitchButtons
					property='group'
					currentRoom={props.currentRoom}
					setCurrentRoom={props.setCurrentRoom}
					label='Vill du styra armaturerna ihop eller individuellt?'
					field={["Ihop", "Individuellt"]}
					infoText='Info text here'
				/>
			</div>

			<div
				id='step3'
				className={
					!(props.currentRoom.group != "") ? "visually-hidden-focusable" : "row pt-4 justify-content-center"
				}
			>
				<SwitchButtons
					property='app'
					currentRoom={props.currentRoom}
					setCurrentRoom={props.setCurrentRoom}
					label='Vill du styra med app (t ex tidstyrt) eller knapp?'
					field={["App", "Knapp"]}
					infoText='Info text here'
				/>

				{props.currentRoom.app == "Knapp" && (
					<Quantity
						property='switches'
						currentRoom={props.currentRoom}
						setCurrentRoom={props.setCurrentRoom}
						label='Switches'
						// infoText="Info text here"
					/>
				)}
			</div>

			<div
				id='step4'
				className={
					!(props.currentRoom.switches > 0 || props.currentRoom.app == "App")
						? "visually-hidden-focusable"
						: "row pt-4 justify-content-center"
				}
			></div>
		</>
	);
};

export default NewRoom;
