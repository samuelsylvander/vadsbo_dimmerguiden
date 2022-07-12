import { createContext, useReducer } from "react";

const ProjectDataContext = createContext();

//reducer function called by dispatch({action: 'replace', field: 'room.name', value: 'new name'})

function reducer({ state, action }) {
	const { type, field, value } = action;
	let newState = JSON.parse(JSON.stringify(state)); //deep copy

	//assign editedField by reference to edit newState
	let editedField = newState;
	const fieldLevelsArray = field.split(".");
	fieldLevelsArray.forEach((field) => (editedField = editedField[field]));

	switch (type) {
		case "initialise":
			newState = JSON.parse(JSON.stringify(value));
		case "replace":
			editedField = value;
			break;
		case "increase":
			if (typeof editedField === "number") {
				editedField++;
			}
			break;
		case "decrease":
			if (typeof editedField === "number") {
				editedField++;
			}
			break;
		case "push":
			if (editedField.isArray()) {
				editedField.push(value);
			}
			break;
		case "remove":
			if (editedField.isArray()) {
				editedField.splice(value, 1);
			}
			break;
	}
	return newState;
}

export default function ProjectDataContextProvider({ children }) {
	const [projectData, dispatch] = useReducer(reducer, {});

	const contextValue = { projectData, dispatch };

	return <ProjectDataContext.Provider value={contextValue}>{children}</ProjectDataContext.Provider>;
}

export { ProjectDataContext };
