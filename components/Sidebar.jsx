import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faFilePdf, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { ProjectDataContext } from "../libs/ProjectDataContext";
import { ProjectTemplateContext } from "../libs/ProjectTemplateContext";

function Sidebar({ showDetails }) {
	const { projectData } = useContext(ProjectDataContext);
	const { products } = useContext(ProjectTemplateContext);
	const { productsTotal, addonsTotal } = calculateTotals(projectData);

	function calculateTotals() {
		function addProduct(addFrom, addTo) {
			if (addTo.hasOwnProperty(addFrom.id)) {
				addTo[addFrom.id].quantity += addFrom.quantity;
			} else {
				addTo[addFrom.id] = JSON.parse(JSON.stringify(addFrom));
			}
		}

		//total up room products, then get details
		const productsTotal = {};

		projectData.rooms.forEach((room) => {
			const roomTotals = {};
			room.products.forEach((product) => {
				if (product.selected || product.required) {
					addProduct(product, roomTotals);
				}
			});
			room.sensor.products.forEach((product) => {
				if (product.selected || product.required) {
					addProduct(product, roomTotals);
				}
			});

			Object.keys(roomTotals).forEach((id) =>
				addProduct({ ...roomTotals[id], quantity: roomTotals[id].quantity * room.quantity }, productsTotal)
			);
		});
		// get product details
		Object.keys(productsTotal).forEach((itemId) => {
			const details = products.find((product) => product.id == itemId);
			productsTotal[itemId].name = details.name;
			productsTotal[itemId].description = details.description;
		});

		//total up addons
		const addonsTotal = {};
		projectData.products.forEach((product) => {
			if (product.required || product.selected) {
				addProduct(product, addonsTotal);
			}
		});
		//get addon details
		Object.keys(addonsTotal).forEach((itemId) => {
			const details = products.find((product) => product.id == itemId);
			addonsTotal[itemId].name = details.name;
			addonsTotal[itemId].description = details.description;
		});

		return { productsTotal, addonsTotal };
	}

	return (
		<div className='d-flex flex-column h-100 m-0'>
			<div id='basket-items' className='text-white flex-grow-1 p-2'>
				<h2 className='text-center pt-2 pb-4'>Plocklista</h2>
				<ul className='list-unstyled p-2'>
					{Object.keys(productsTotal).map((item) => {
						return (
							<li className='mb-4' key={item}>
								<h4>
									{productsTotal[item].name}{" "}
									<FontAwesomeIcon
										icon={faCircleInfo}
										onClick={() => showDetails(productsTotal[item].description)}
									/>
								</h4>
								<div className='d-flex justify-content-between'>
									<div>Antal</div>
									<div>{productsTotal[item].quantity}</div>
								</div>
							</li>
						);
					})}
					<li>
						{Object.keys(addonsTotal).length > 0 && (
							<>
								<h4 className='mt-5'>Tillval</h4>
								{Object.keys(addonsTotal).map((addon) => (
									<p className='my-1' key={addon}>
										{addonsTotal[addon].name}
									</p>
								))}
							</>
						)}
					</li>
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
