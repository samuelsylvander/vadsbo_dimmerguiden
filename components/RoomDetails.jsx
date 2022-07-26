import React, { useEffect, useContext, useState } from "react";
import SwitchButtons from "./SwitchButtons";
import Info from "./Info";

import { ProjectTemplateContext } from "../libs/ProjectTemplateContext";
import { ProjectDataContext } from "../libs/ProjectDataContext";

export default function NewRoom({ setAppState, roomIndex }) {
	const { projectData, dispatch } = useContext(ProjectDataContext);
	const { products } = useContext(ProjectTemplateContext);
	const [inputCompleteFlag, setInputCompleteFlag] = useState(false);
	const roomTemplateDetails = getRoomTemplateDetails();

	function getRoomTemplateDetails() {
		let roomDetails = { ...projectData.rooms[roomIndex] };
		roomDetails.products = roomDetails.products.map((product) => {
			const productDetails = products.find((item) => item.id === product.id);
			return { ...product, ...productDetails };
		});
		roomDetails.sensor.products = roomDetails.sensor.products.map((product) => {
			const productDetails = products.find((item) => item.id === product.id);
			return { ...product, ...productDetails };
		});
		return roomDetails;
	}

	function getColorOptions(selectedProduct, option) {
		const lookup = selectedProduct.options.brand.find((brand) => brand.name === option);
		if (lookup) {
			return lookup.color_options;
		} else {
			return [];
		}
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

					{roomTemplateDetails.products.map((currentProduct, index) => (
						<>
							<SwitchButtons
								key={index}
								label={currentProduct.name}
								field={`rooms.${roomIndex}.products.${index}.selected`}
							/>
							{currentProduct.selected === true && currentProduct.hasOwnProperty("options") && (
								<>
									<SwitchButtons
										label={"Brand"}
										buttonLabels={currentProduct.options.brand.map((option) => option.name)}
										options={currentProduct.options.brand.map((option) => option.name)}
										field={`rooms.${roomIndex}.products.${index}.options.brand`}
									/>
									{projectData.rooms[roomIndex].products[index]?.options?.brand && (
										<>
											<SwitchButtons
												label={
													projectData.rooms[roomIndex].products[index].options.brand +
													" Color Options"
												}
												buttonLabels={getColorOptions(
													currentProduct,
													projectData.rooms[roomIndex].products[index].options.brand
												)}
												options={getColorOptions(
													currentProduct,
													projectData.rooms[roomIndex].products[index].options.brand
												)}
												field={`rooms.${roomIndex}.products.${index}.options.color`}
											/>
										</>
									)}
								</>
							)}
						</>
					))}

					{projectData.rooms[roomIndex].sensor.required === false && (
						<SwitchButtons label='Do you need a Sensor?' field={`rooms.${roomIndex}.sensor.selected`} />
					)}

					{(projectData.rooms[roomIndex].sensor.required === true ||
						projectData.rooms[roomIndex].sensor.selected === true) && (
						<>
							{roomTemplateDetails.sensor.products.map((product, index) => (
								<>
									<SwitchButtons
										key={index}
										label={product.name}
										field={`rooms.${roomIndex}.sensor.products.${index}.selected`}
									/>
									{product.hasOwnProperty("options") && JSON.stringify(product.options)}
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
