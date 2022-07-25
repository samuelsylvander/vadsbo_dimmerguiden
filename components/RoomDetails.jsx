import React, { useEffect, useContext, useState } from "react";
import SwitchButtons from "./SwitchButtons";
import Info from "./Info";

import { ProjectTemplateContext } from "../libs/ProjectTemplateContext";
import { ProjectDataContext } from "../libs/ProjectDataContext";

export default function NewRoom({ setAppState, roomIndex }) {
	const { projectData, dispatch } = useContext(ProjectDataContext);
	const { roomTemplates, products } = useContext(ProjectTemplateContext);
	const [inputCompleteFlag, setInputCompleteFlag] = useState(false);
	const currentRoomTemplate = roomTemplates.find(
		(room) => room.room_template_id === projectData.rooms[roomIndex].room_template_id
	);
	const roomTemplateDetails = getRoomTemplateDetails();

	function getRoomTemplateDetails() {
		let roomDetails = { ...currentRoomTemplate };
		roomDetails.products = currentRoomTemplate.products.map((product) => {
			const productDetails = products.find((item) => item.id === product.id);
			return { ...product, ...productDetails };
		});
		roomDetails.sensor.products = currentRoomTemplate.sensor.products.map((product) => {
			const productDetails = products.find((item) => item.id === product.id);
			return { ...product, ...productDetails };
		});
		return roomDetails;
	}

	useEffect(() => {
		//check each div named 'switch-buttons', see if it has a selected value
		const switchesArray = Array.from(document.getElementsByClassName("switch-buttons"));
		const completedBoolean = switchesArray.every((switchDiv) => {
			const children = Array.from(switchDiv.children);
			return children.some((child) => child.dataset.selected === "true");
		});
		setInputCompleteFlag(completedBoolean);
	}, [projectData]);

	function addRequired() {
		currentRoomTemplate.products.forEach((searchItem) => {
			if (
				searchItem.required === true &&
				!projectData.rooms[roomIndex].products.some((listItem) => listItem.id === searchItem.id)
			) {
				dispatch({ type: "add", field: `rooms.${roomIndex}.products` });
			}
		});
		currentRoomTemplate.sensor.products.forEach((searchItem) => {
			if (
				searchItem.required === true &&
				!projectData.rooms[roomIndex].sensor.products.some((listItem) => listItem.id === searchItem.id)
			) {
				dispatch({ type: "add", field: `rooms.${roomIndex}.sensor.products` });
			}
		});
	}

	function handleSaveRoom() {
		addRequired();
		setAppState("summary");
	}

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
					</label>

					{roomTemplateDetails.products.map((product, index) => (
						<SwitchButtons
							key={index}
							label={product.name}
							buttonLabels={["Yes", "No"]}
							options={[true, false]}
							field={`rooms.${roomIndex}.products.${index}.selected`}
						/>
					))}

					{projectData.rooms[roomIndex].sensor.required === false && (
						<SwitchButtons
							label='Do you need a Sensor?'
							buttonLabels={["Yes", "No"]}
							options={[true, false]}
							field={`rooms.${roomIndex}.sensor.selected`}
						/>
					)}

					{(projectData.rooms[roomIndex].sensor.required === true ||
						projectData.rooms[roomIndex].sensor.selected === true) && (
						<>
							{roomTemplateDetails.sensor.products.map((product, index) => (
								<SwitchButtons
									key={index}
									label={product.name}
									buttonLabels={["Yes", "No"]}
									options={[true, false]}
									field={`rooms.${roomIndex}.sensor.products.${index}.selected`}
								/>
							))}

							{/* {environmentalSensorProductOptions.map((productOption) => (
								<>
									<SwitchButtons
										label={productOption.name}
										buttonLabels={productOption.values.map((option) => option.name)}
										options={productOption.values.map((option) => {
											return { id: option.id, quantity: 1 };
										})}
										field={`rooms.${roomIndex}.environmental_sensor.products.0.options.${productOption.name}`}
									/>

									{projectData.rooms[roomIndex].environmental_sensor.products[0].options?.[
										productOption.name
									]?.id &&
										productOption.values.some((option) => !!option.color_options) && (
											<SwitchButtons
												label='Color Options'
												buttonLabels={
													productOption.values.find(
														(option) =>
															option.id ===
															projectData.rooms[roomIndex].environmental_sensor
																.products[0].options[productOption.name].id
													).color_options
												}
												options={
													productOption.values.find(
														(option) =>
															option.id ===
															projectData.rooms[roomIndex].environmental_sensor
																.products[0].options[productOption.name].id
													).color_options
												}
												field={`rooms.${roomIndex}.environmental_sensor.products.0.options.${productOption.name}.color_options`}
											/>
										)}
								</>
							))} */}
						</>
					)}

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
