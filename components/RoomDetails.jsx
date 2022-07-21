import React, { useEffect, useContext, useState, useMemo } from "react";
import SwitchButtons from "./SwitchButtons";
import Info from "./Info";

import { ProjectTemplateContext } from "../libs/ProjectTemplateContext";
import { ProjectDataContext } from "../libs/ProjectDataContext";

export default function NewRoom({ setAppState, roomIndex }) {
	const { projectData, dispatch } = useContext(ProjectDataContext);
	const projectTemplate = useContext(ProjectTemplateContext);
	const [inputCompleteFlag, setInputCompleteFlag] = useState(false);

	const sensorOptions = useMemo(() => {
		let optionsFromTemplate = [];

		if (projectData.rooms[roomIndex].sensor.selected === true) {
			optionsFromTemplate = projectTemplate.sensor_options.yes.optional_products;
		} else if (projectData.rooms[roomIndex].sensor.selected === false) {
			optionsFromTemplate = projectTemplate.sensor_options.no.optional_products;
		}

		const optionsDetails = optionsFromTemplate.map((option) =>
			projectTemplate.products.find((product) => product.id === option.id)
		);

		return optionsDetails;
	}, [projectData, projectTemplate, roomIndex]);

	const environmentalSensorProducts = useMemo(() => {
		const productOptions = projectTemplate.sensor_options.environmental.optional_products;
		const envSensorProducts = productOptions.map((option) =>
			projectTemplate.products.find((product) => product.id === option.id)
		);
		return envSensorProducts;
	}, [projectTemplate]);

	const environmentalSensorProductOptions = useMemo(() => {
		const chosenProductId = projectData.rooms[roomIndex].environmental_sensor.products[0].id;
		const matchingProduct = projectTemplate.products.find((product) => product.id == chosenProductId);

		if (matchingProduct && matchingProduct.hasOwnProperty("options")) {
			const optionKeys = Object.keys(matchingProduct.options);
			const productOptions = optionKeys.map((key) => {
				return { name: key, values: matchingProduct.options[key] };
			});
			return productOptions;
		} else {
			return [];
		}
	}, [projectData, projectTemplate, roomIndex]);

	useEffect(() => {
		//check each div named 'switch-buttons', see if it has a selected value
		const switchesArray = Array.from(document.getElementsByClassName("switch-buttons"));
		const completedBoolean = switchesArray.every((switchDiv) => {
			const children = Array.from(switchDiv.children);
			return children.some((child) => child.dataset.selected === "true");
		});
		setInputCompleteFlag(completedBoolean);
	}, [projectData]);

	function handleSaveRoom() {
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
					<SwitchButtons
						label='Do you need a Sensor?'
						buttonLabels={["Yes", "No"]}
						options={[true, false]}
						field={`rooms.${roomIndex}.sensor.selected`}
					/>

					<SwitchButtons
						label='Sensor options'
						buttonLabels={sensorOptions.map((option) => option.name)}
						options={sensorOptions.map((option) => {
							return { id: option.id, quantity: 1 };
						})}
						field={`rooms.${roomIndex}.sensor.products`}
						multiple
					/>

					<SwitchButtons
						label='Environmental Sensor?'
						buttonLabels={["Yes", "No"]}
						options={[true, false]}
						field={`rooms.${roomIndex}.environmental_sensor.selected`}
					/>

					{projectData.rooms[roomIndex].environmental_sensor.selected === true && (
						<>
							<SwitchButtons
								label='Environmental Sensor Options'
								buttonLabels={environmentalSensorProducts.map((option) => option.name)}
								options={environmentalSensorProducts.map((option) => {
									return { id: option.id, quantity: 1, options: {} };
								})}
								field={`rooms.${roomIndex}.environmental_sensor.products.0`}
							/>

							{environmentalSensorProductOptions.map((productOption) => (
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
							))}
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
