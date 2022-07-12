import React, { useEffect, useContext } from "react";
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
	console.log(projectData);

	const newRoomTemplate = {
		name: "Small Office",
		description: "2-10m2",
		photo: "/photos/my-photo.png",
		icon: "/icons/my-icon.png",
		products: [
			{
				id: 1,
				quantity: 2,
			},
			{
				id: 2,
				quantity: 3,
			},
		],
		sensor: {
			optional: false,
			options: [
				{
					no: {
						products: [
							{
								id: 1,
								quantity: 2,
							},
						],
						"optional products": [
							{
								id: 2,
								quantity: 2,
							},
						],
					},
				},
				{
					yes: {
						products: [
							{
								id: 1,
								quantity: 2,
							},
						],
						"optional products": [
							{
								id: 2,
								quantity: 2,
							},
						],
					},
				},
			],
		},
	};

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
					<label>
						<h3 className='d-inline-block mb-2'>Ge rummet ett namn</h3>

						<Info text={"Välj ett passande namn till rummet."} />
						<input
							className='form-control bg-white'
							type='text'
							placeholder='T ex Kontor'
							value={projectData.rooms && projectData.rooms[roomIndex].name}
							onChange={(event) =>
								dispatch({
									type: "replace",
									field: `rooms.${roomIndex}.name`,
									value: event.target.value,
								})
							}
							required
						/>

						<SwitchButtons label='Test' options={["yes", "no"]} field={`rooms.${roomIndex}.test`} />
					</label>
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
			>
				<button className='btn btn-lg btn-dark w-auto' onClick={handleSaveRoom}>
					Spara rum
				</button>
			</div>
		</>
	);
};

export default NewRoom;
