import Head from "next/head";
import React, { useContext, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Header from "../components/Header";
import { ProjectTemplateContext } from "../libs/ProjectTemplateContext";

export default function Home() {
	const [projectName, setProjectName] = useState("");
	const [buttonText, setButtonText] = useState("Start Project");
	const [projectTemplateIndex, setProjectTemplateIndex] = useState();
	const router = useRouter();
	const projectTemplate = useContext(ProjectTemplateContext);
	const projectNameModal = useRef();

	function getProjectName(cardIndex) {
		setProjectTemplateIndex(cardIndex);
		projectNameModal.current.show();
	}

	async function handleNewProject() {
		// set loading animation
		const newText = (
			<span>
				Skapar projekt
				<div className='d-flex align-items-center'>
					Laddar...
					<div className='spinner-border spinner-border-sm ms-auto' role='status' aria-hidden='true'></div>
				</div>
			</span>
		);
		setButtonText(newText);

		//start working
		const url = "/api/savetodbAPI";
		const newProject = {
			...projectTemplate.project_templates[projectTemplateIndex],
			template_id: projectTemplate.project_templates[projectTemplateIndex].id,
			name: projectName,
			id: undefined,
		};
		await fetch(url, {
			method: "POST",
			body: JSON.stringify(newProject),
		})
			.then((response) => response.json())
			.then((response) => {
				// console.log("database response: " + JSON.stringify(response));
				// don't hide the modal, so that the user has an indication that we are waiting for something to finish
				// the modal backdrop will be removed when the next page loads
				// this is a limitation of getServerSideProps
				// projectNameModal.current.hide();
				router.push("./" + response.insertedId);
			})
			.catch((error) => console.log("database error: " + error));
	}

	useEffect(() => {
		const { Modal } = require("bootstrap");
		projectNameModal.current = Modal.getOrCreateInstance(document.getElementById("project-name-modal"));
	}, []);

	return (
		<>
			<Head>
				<title>Vadsbo dimmerGuiden&trade;</title>
				<link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
				<link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
				<link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
				<link rel='manifest' href='/site.webmanifest'></link>
			</Head>
			<Header />
			<div className='mx-5 m-lg-auto col-lg-8 pt-5 text-center'>
				<h1>Planera din belysning med dimmerGuiden™</h1>
				<p className='my-5'>
					Välj vilken typ av projekt du vill designa här nedanför så guidar vi dig genom hela processen.
				</p>
				<div className='row justify-content-center'>
					{projectTemplate.project_templates.map((template, index) => (
						<div key={index} className='col-sm-4'>
							<div className='card h-100'>
								<Image
									src={template.photo}
									alt={template.name}
									layout='responsive'
									width='300px'
									height='300px'
								/>
								<div className='card-body'>
									<h5 className='card-title'>{template.name}</h5>
									<p className='card-text'>{template.description}</p>
									<button onClick={() => getProjectName(index)} className='btn btn-dark mt-3'>
										Start Project
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className='modal' tabIndex='-1' id='project-name-modal'>
				<div className='modal-dialog modal-dialog-centered'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title fw-bold'>Ge ditt projekt ett namn</h5>
						</div>
						<div className='modal-body'>
							<label className='w-100'>
								<span className='fw-bold mb-3'>Namn</span>
								<input
									className='w-100 p-2'
									type='text'
									placeholder='New Project Name'
									value={projectName}
									onChange={(e) => setProjectName(e.target.value)}
								/>
							</label>
						</div>
						<div className='modal-footer'>
							<button className='btn btn-dark' data-bs-dismiss='modal'>
								Cancel
							</button>
							<button className='btn btn-primary' onClick={handleNewProject}>
								{buttonText}
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
