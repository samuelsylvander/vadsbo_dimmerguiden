import React, { useEffect, useContext, useState, useMemo } from "react";
import SwitchButtons from "./SwitchButtons";
import Info from "./Info";

import { ProjectTemplateContext } from "../libs/ProjectTemplateContext";
import { ProjectDataContext } from "../libs/ProjectDataContext";

export default function NewRoom({ setAppState, roomIndex }) {
	const { isLoading, projectData, dispatch } = useContext(ProjectDataContext);
	const projectTemplate = useContext(ProjectTemplateContext);
	const sensorOptions = useMemo(() => getSensorOptions(), [projectData, projectTemplate]);
	const environmentalSensorOptions = useMemo(() => getEnvironmentalSensorOptions(), [projectData, projectTemplate]);
	const environmentalSensorDetailedOptionsList = useMemo(
		() => getEnvironmentalSensorDetailedOptionsList(),
		[environmentalSensorOptions]
	);
	const [inputCompleteFlag, setInputCompleteFlag] = useState(false);

	useEffect(() => {
		//check each div named 'switch-buttons', see if it has a selected value
		const switchesArray = Array.from(document.getElementsByClassName("switch-buttons"));
		const completedBoolean = switchesArray.every((switchDiv) => {
			const children = Array.from(switchDiv.children);
			return children.some((child) => child.dataset.selected === "true");
		});
		setInputCompleteFlag(completedBoolean);
	}, [projectData]);

	function getSensorOptions() {
		if (isLoading || projectData.rooms.length <= roomIndex) {
			return [];
		} else {
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
		}
	}

	function getEnvironmentalSensorOptions() {
		if (isLoading || projectData.rooms.length <= roomIndex) {
			return [];
		} else {
			const environmentalOptionsFromTemplate = projectTemplate.sensor_options.environmental.optional_products;
			const environmentalOptionsDetails = environmentalOptionsFromTemplate.map((option) =>
				projectTemplate.products.find((product) => product.id === option.id)
			);
			return environmentalOptionsDetails;
		}
	}

	function getEnvironmentalSensorDetailedOptionsList() {
		if (isLoading || projectData.rooms.length <= roomIndex) {
			return [];
		} else {
			const chosenEnvironmentalSensorId = projectData.rooms[roomIndex].environmental_sensor.products.id;
			const matchingProduct = projectTemplate.products.find(
				(product) => product.id == chosenEnvironmentalSensorId
			);

			if (matchingProduct && matchingProduct.hasOwnProperty("options")) {
				const optionKeys = Object.keys(matchingProduct.options);
				const optionsArray = optionKeys.map((key) => {
					return { name: key, values: matchingProduct.options[key] };
				});
				return optionsArray;
			} else {
				return [];
			}
		}
	}

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

					{projectData.rooms[roomIndex].environmental_sensor.selected === "true" && (
						<SwitchButtons
							label='Environmental Sensor Options'
							buttonLabels={environmentalSensorOptions.map((option) => option?.name)}
							options={environmentalSensorOptions.map((option) => option?.id)}
							field={`rooms.${roomIndex}.environmental_sensor.products.id`}
						/>
					)}

					{environmentalSensorDetailedOptionsList.map((detailedOption) => (
						<>
							<SwitchButtons
								label={detailedOption.name}
								buttonLabels={detailedOption.values.map((option) => option?.name)}
								options={detailedOption.values.map((option) => {
									return { id: option.id, quantity: 1 };
								})}
								field={`rooms.${roomIndex}.environmental_sensor.products.options.${detailedOption.name}`}
							/>
							{/* color options here */}
						</>
					))}

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
