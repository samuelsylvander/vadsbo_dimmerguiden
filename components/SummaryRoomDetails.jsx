import React, { useContext, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faChevronDown, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { ProjectDataContext } from "../libs/ProjectDataContext";
import { ProjectTemplateContext } from "../libs/ProjectTemplateContext";
// import { Collapse } from "bootstrap";

// props required:
// roomIndex: index of current room in roomList
// setAppState: function to change app 'screen', for opening rooms to edit
// setRoomIndex: set index of currently edited room, use with setAppState
// handleDelete: delete room after calling confirmation modal

function RoomQuantity({ roomIndex, setAppState, setRoomIndex, handleDelete }) {
	const { projectData, dispatch } = useContext(ProjectDataContext);
	const { products } = useContext(ProjectTemplateContext);
	const roomProducts = getRoomProducts();
	const collapseRef = useRef();
	const chevronRef = useRef();

	function handleCollapse() {
		if (document.getElementById("summarydetails" + roomIndex).classList.contains("show")) {
			chevronRef.current.style.transform = "rotate(0deg)";
		} else {
			chevronRef.current.style.transform = "rotate(180deg)";
		}
		collapseRef.current.toggle();
	}

	function getRoomProducts() {
		const productDetails = projectData.rooms[roomIndex].products.map((roomProduct) => {
			const lookup = products.find((product) => product.id === roomProduct.id);
			return { ...lookup, ...roomProduct };
		});
		const addonDetails = projectData.rooms[roomIndex].sensor.products.map((roomProduct) => {
			const lookup = products.find((product) => product.id === roomProduct.id);
			return { ...lookup, ...roomProduct };
		});
		return [...productDetails, ...addonDetails];
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

	useEffect(() => {
		// set up the bootstrap collapse
		const { Collapse } = require("bootstrap");

		collapseRef.current = new Collapse(document.getElementById("summarydetails" + roomIndex), { toggle: false });
	}, [roomIndex]);

	useEffect(() => {
		//uncollapse details if five or fewer rooms
		if (projectData.rooms.length <= 5) {
			document.getElementById("summarydetails" + roomIndex).classList.add("show");
			chevronRef.current.style.transform = "rotate(180deg)";
		}
		requestAnimationFrame(() => (chevronRef.current.style.transition = "all 300ms"));
	}, [projectData.rooms.length, roomIndex]);

	return (
		<div className='card bg-secondary mb-4 p-3'>
			<div className='row align-items-center'>
				<div className='col-lg-6 me-auto'>
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
							aria-expanded='false'
							aria-controls={"summarydetails" + roomIndex}
							onClick={handleCollapse}
						>
							<div ref={chevronRef}>
								<FontAwesomeIcon icon={faChevronDown} />
							</div>
						</button>
					</div>
				</div>
			</div>
			<div className='collapse p-0' id={"summarydetails" + roomIndex}>
				<div className='card-body pb-0'>
					{roomProducts.map(
						(product, index) =>
							(product.required === true || product.selected === true) && (
								<p key={index}>
									{product.name + ": "}
									<strong>{product.quantity}</strong>
									{product?.options?.brand && <em>{" " + product.options.brand + ", "}</em>}
									{product?.options?.color && <em>{" " + product.options.color}</em>}
								</p>
							)
					)}
				</div>
			</div>
		</div>
	);
}

export default RoomQuantity;
