import React from "react";

export default function Modals({ handleGetQuote, handleShare, handleNameChange, projectName }) {
	return (
		<>
			{/* Confirm Delete Modal */}
			<div
				className='modal fade'
				id='confirmDelete'
				data-bs-backdrop='static'
				data-bs-keyboard='false'
				tabIndex='-1'
				aria-labelledby='staticBackdropLabel'
				aria-hidden='true'
			>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='confirmDeleteLabel'>
								Är du säker?
							</h5>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
							></button>
						</div>
						<div className='modal-body'>Detta går inte att ångra.</div>
						<div className='modal-footer'>
							<button type='button' className='btn btn-outline-dark' data-bs-dismiss='modal'>
								Avbryt
							</button>
							<button id='confirmDeleteButton' type='button' className='btn btn-dark'>
								Radera
							</button>
						</div>
					</div>
				</div>
			</div>
			{/* Get Quote Modal */}
			<div
				className='modal fade'
				id='getQuote'
				data-bs-backdrop='static'
				data-bs-keyboard='false'
				tabIndex='-1'
				aria-hidden='true'
			>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h1>Be om offert</h1>
						</div>

						<form id='get-quote-form' name='get-quote' onSubmit={handleGetQuote}>
							<div className='modal-body'>
								<div className='mb-3'>
									<label htmlFor='name' className='form-label'>
										Namn
									</label>
									<input
										type='text'
										className='form-control bg-white'
										id='name'
										name='name'
										required
									/>
								</div>
								<div className='mb-3'>
									<label htmlFor='phone' className='form-label'>
										Telefon
									</label>
									<input
										type='text'
										className='form-control bg-white'
										id='phone'
										name='phone'
										required
									/>
								</div>
								<div className='mb-3'>
									<label htmlFor='email' className='form-label'>
										E-post
									</label>
									<input
										type='email'
										className='form-control bg-white'
										id='email'
										name='email'
										required
									/>
								</div>
								<div className='mb-3'>
									<label htmlFor='message' className='form-label'>
										Övrig information
									</label>
									<textarea className='form-control bg-white' id='message' name='message'></textarea>
								</div>
								<div className='mb-3'>
									<input
										type='checkbox'
										className='form-check-input me-2'
										id='quoteacceptpolicy'
										name='acceptpolicy'
										required
									/>
									<label htmlFor='quoteacceptpolicy' className='form-label'>
										Godkänn hur vi hanterar dina{" "}
										<a
											href='https://www.vadsbo.net/integritetspolicy/'
											target='_blank'
											rel='noreferrer'
											className='text-black'
										>
											personuppgifter
										</a>
									</label>
								</div>
							</div>
							<div className='modal-footer'>
								<button
									id='dismissmodal'
									className='btn btn-outline-dark me-2'
									type='button'
									data-bs-dismiss='modal'
								>
									Avbryt
								</button>
								<button className='btn btn-dark' type='submit'>
									Skicka
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			{/* Share Project Modal */}
			<div
				className='modal fade'
				id='shareProject'
				data-bs-backdrop='static'
				data-bs-keyboard='false'
				tabIndex='-1'
				aria-hidden='true'
			>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h1>Be om offert</h1>
						</div>

						<form id='share-project-form' name='share-project' onSubmit={handleShare}>
							<div className='modal-body'>
								<div className='mb-3'>
									<label htmlFor='name' className='form-label'>
										Namn
									</label>
									<input
										type='text'
										className='form-control bg-white'
										id='name'
										name='name'
										required
									/>
								</div>
								<div className='mb-3'>
									<label htmlFor='email' className='form-label'>
										E-post
									</label>
									<input
										type='email'
										className='form-control bg-white'
										id='email'
										name='email'
										required
									/>
								</div>
								<div className='mb-3'>
									<label htmlFor='message' className='form-label'>
										Övrig information
									</label>
									<textarea
										className='form-control bg-white'
										id='message'
										name='message'
										required
									></textarea>
								</div>
								<div className='mb-3'>
									<label htmlFor='shareacceptpolicy' className='form-label'>
										<input
											type='checkbox'
											className='form-check-input me-2'
											id='shareacceptpolicy'
											name='acceptpolicy'
											required
										/>
										Godkänn hur vi hanterar dina{" "}
										<a
											href='https://www.vadsbo.net/integritetspolicy/'
											target='_blank'
											rel='noreferrer'
											className='text-black'
										>
											personuppgifter
										</a>
									</label>
								</div>
							</div>
							<div className='modal-footer'>
								<button
									id='dismissmodal'
									className='btn btn-outline-dark me-2'
									type='button'
									data-bs-dismiss='modal'
								>
									Avbryt
								</button>
								<button className='btn btn-dark' type='submit'>
									Skicka
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			{/* Sidebar Product Info Modal */}
			<div
				className='modal fade'
				id='productDetails'
				data-bs-backdrop='static'
				data-bs-keyboard='false'
				tabIndex='-1'
				aria-labelledby='staticBackdropLabel'
				aria-hidden='true'
			>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='productDetailsHeader'>
								Produkt
							</h5>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
							></button>
						</div>
						<div id='productDetailsBody' className='modal-body'>
							Produktdetaljer.
						</div>
						<div className='modal-footer'>
							<button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
								Avbryt
							</button>
						</div>
					</div>
				</div>
			</div>
			{/* Quote Submitted Modal */}
			<div
				className='modal fade'
				id='quoteSubmitted'
				data-bs-backdrop='static'
				data-bs-keyboard='false'
				tabIndex='-1'
				aria-labelledby='staticBackdropLabel'
				aria-hidden='true'
			>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='quoteSubmittedLabel'>
								Your Request Was Submitted
							</h5>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
							></button>
						</div>
						<div className='modal-body'>
							Vill du fortsätta att arbeta på projektet, eller gå vidare till www.vadsbo.net?
						</div>
						<div className='modal-footer'>
							<button type='button' className='btn btn-outline-dark me-2' data-bs-dismiss='modal'>
								Tillbaka till Projektet
							</button>
							<a href='https://www.vadsbo.net' id='goToVadsbo' type='button' className='btn btn-dark'>
								Vidare till vadsbo.net
							</a>
						</div>
					</div>
				</div>
			</div>
			{/* Change Project Name Modal */}
			<div
				className='modal fade'
				id='changeName'
				data-bs-backdrop='static'
				data-bs-keyboard='false'
				tabIndex='-1'
				aria-labelledby='staticBackdropLabel'
				aria-hidden='true'
			>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='confirmDeleteLabel'>
								Uppdatera Projektets Namn
							</h5>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
							></button>
						</div>
						<form id='change-name-form' name='share-project' onSubmit={handleNameChange}>
							<div className='modal-body'>
								<div className='mb-3'>
									<label htmlFor='name' className='form-label'>
										Nytt Projektnamn
									</label>
									<input
										type='text'
										placeholder={projectName}
										className='form-control bg-white'
										id='newProjectName'
										required
									/>
								</div>
							</div>
							<div className='modal-footer'>
								<button
									id='dismissmodal'
									className='btn btn-outline-dark me-2'
									type='button'
									data-bs-dismiss='modal'
								>
									Avbryt
								</button>
								<button className='btn btn-dark' type='submit'>
									Spara
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
