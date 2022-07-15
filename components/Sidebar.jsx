import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faFilePdf, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { ProjectDataContext } from "../libs/ProjectDataContext";
import { ProjectTemplateContext } from "../libs/ProjectTemplateContext";

function Sidebar({ showDetails }) {
	const { projectData } = useContext(ProjectDataContext);
	const projectTemplate = useContext(ProjectTemplateContext);
	const basketItems = calculateTotals(projectData);
	const filteredOptions = projectData.addons;

	function calculateTotals() {
		const output = {};

		function addProduct(addFrom, addTo) {
			if (addTo.hasOwnProperty(addFrom.id)) {
				addTo[addFrom.id].quantity += addFrom.quantity;
			} else {
				addTo[addFrom.id] = JSON.parse(JSON.stringify(addFrom));
			}
		}

		console.log(projectData);

		projectData.required_products.forEach((product) => {
			addProduct(product, output);
		});

		projectData.rooms.forEach((room) => {
			console.log("current room " + room.name);
			const roomTotals = {};
			room.products.forEach((product) => {
				addProduct(product, roomTotals);
			});
			room.sensor.products.forEach((product) => {
				addProduct(product, roomTotals);
			});
			room.environmental_sensor.products.forEach((product) => {
				addProduct(product, roomTotals);
			});
			Object.keys(roomTotals).forEach((id) => addProduct(roomTotals[id], output));
		});

		console.log(output);

		Object.keys(output).forEach((itemId) => {
			console.log(itemId);
			const details = projectTemplate.products.find((product) => product.id == itemId);
			console.log(details);
			output[itemId].name = details.name;
			output[itemId].description = details.description;
		});
		console.log(output);

		return output;
	}

	return (
		<div className='d-flex flex-column h-100 m-0'>
			<div id='basket-items' className='text-white flex-grow-1 p-2'>
				<h2 className='text-center pt-2 pb-4'>Plocklista</h2>
				<ul className='list-unstyled p-2'>
					{Object.keys(basketItems).map((item) => {
						return (
							<li className='mb-4' key={item}>
								<h4>
									{basketItems[item].name}{" "}
									<FontAwesomeIcon icon={faCircleInfo} onClick={() => showDetails(item)} />
								</h4>
								<div className='d-flex justify-content-between'>
									<div>Antal</div>
									<div>{basketItems[item].quantity}</div>
								</div>
							</li>
						);
					})}
					{/* <li>
						{filteredOptions.length > 0 && (
							<>
								<h4 className='mt-5'>Tillval</h4>
								{filteredOptions.map((option) => (
									<p className='my-1' key={option}>
										{optionLookup[option]}
									</p>
								))}
							</>
						)}
					</li> */}
				</ul>
			</div>

			<div id='basket-buttons' className='w-100'>
				<div
					id='contact'
					className='container m-0 py-4 bg-info'
					data-bs-toggle='modal'
					data-bs-target='#getQuote'
				>
					<FontAwesomeIcon icon={faDollarSign} /> Be om offert
				</div>
				<div id='pdf' className='container m-0 py-4 bg-primary'>
					<FontAwesomeIcon icon={faFilePdf} /> Spara PDF
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
