import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faChevronDown, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { ProjectDataContext } from "../libs/ProjectDataContext";
import { ProjectTemplateContext } from "../libs/ProjectTemplateContext";

// props required:
// index: index of current room in roomList

function RoomQuantity({ roomIndex, setAppState, setRoomIndex, handleDelete }) {
	const { projectData, dispatch } = useContext(ProjectDataContext);
	const projectTemplate = useContext(ProjectTemplateContext);
	const roomProducts = getRoomProducts();

	function getRoomProducts() {
		const roomProducts = projectData.rooms[roomIndex].products;
		const productDetails = roomProducts.map((roomProduct) =>
			projectTemplate.products.find((product) => product.id === roomProduct.id)
		);
		return productDetails.map((product, index) => {
			return { ...product, quantity: roomProducts[index].quantity };
		});
	}

	function handleQuantity(event) {
		let update = event.target.value.replace(/\D/, "");
		if (update == "") {
			update = 0;
		}
		dispatch({ type: "replace", field: `rooms.${roomIndex}.quantity`, value: update });
	}

	function handleIncrement(event) {
		event.stopPropagation();
		let update = parseFloat(projectData.rooms[roomIndex].quantity);
		if (event.currentTarget.dataset.type === "plus") {
			dispatch({ type: "increase", field: `rooms.${roomIndex}.quantity` });
		} else if (event.currentTarget.dataset.type === "minus" && update > 1) {
			dispatch({ type: "decrease", field: `rooms.${roomIndex}.quantity` });
		}
	}

	function editRoom(e) {
		e.stopPropagation();
		setRoomIndex(roomIndex);
		setAppState("roomdetails");
	}

	function deleteRoom(e) {
		e.stopPropagation();
		handleDelete(roomIndex);
	}

	return (
		<div className='card bg-secondary mb-4 p-3'>
			<div className='row align-items-center'>
				<div className='col-lg-6 me-auto align-self-center'>
					<h3 className='mb-0'>{projectData.rooms[roomIndex].name}</h3>
				</div>
				<div className='col-lg-auto row justify-content-end'>
					<div className='col-auto'>
						<div className='input-group'>
							<button
								type='button'
								className='btn btn-primary'
								data-type='minus'
								onClick={handleIncrement}
							>
								<FontAwesomeIcon icon={faMinus} data-type='minus' />
							</button>
							<input
								type='text'
								className='form-control input-number bg-white text-center'
								style={{ maxWidth: "4rem" }}
								value={projectData.rooms[roomIndex].quantity}
								onChange={handleQuantity}
								onClick={(event) => event.stopPropagation()}
							/>
							<button
								type='button'
								className='btn btn-primary'
								data-type='plus'
								onClick={handleIncrement}
							>
								<FontAwesomeIcon icon={faPlus} data-type='plus' />
							</button>
						</div>
					</div>
					<div className='col-auto'>
						<a className='text-dark me-2' onClick={editRoom}>
							<FontAwesomeIcon icon={faPenToSquare} />
						</a>
						<a className='text-dark me-2' onClick={deleteRoom}>
							<FontAwesomeIcon icon={faTrashCan} />
						</a>

						<button
							className='btn btn-primary'
							type='button'
							data-bs-toggle='collapse'
							data-bs-target={"#summarydetails" + roomIndex}
							aria-expanded='false'
							aria-controls={"summarydetails" + roomIndex}
						>
							<FontAwesomeIcon icon={faChevronDown} />
						</button>
					</div>
				</div>
			</div>
			<div className='collapse p-0' id={"summarydetails" + roomIndex}>
				<div className='card-body'>
					{roomProducts.map((product, index) => {
						return (
							<p key={index}>
								{product.name + ": "}
								<strong>{product.quantity}</strong>
							</p>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default RoomQuantity;
