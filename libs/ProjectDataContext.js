import { createContext, useReducer } from "react";

const ProjectDataContext = createContext();

//reducer function called by dispatch({action: 'replace', field: 'room.name', value: 'new name'})

export default function ProjectDataContextProvider({ children }) {
	function reducer(state, action) {
		console.log(action);
		let newState = {};
		if (state) {
			newState = JSON.parse(JSON.stringify(state)); //deep copy
		} else {
			if (!action) {
				return {};
			}
		}

		//assign editedField by reference to edit newState
		let editedField = newState;
		if (action.field) {
			const fieldLevelsArray = action.field.split(".");
			fieldLevelsArray.forEach((field) => (editedField = editedField[field]));
		}

		switch (action.type) {
			case "initialise":
				newState = JSON.parse(JSON.stringify(action.value));
			case "replace":
				editedField = action.value;
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
				if (Array.isArray(editedField)) {
					editedField.push(action.value);
				}
				break;
			case "remove":
				if (Array.isArray(editedField)) {
					editedField.splice(action.value, 1);
				}
				break;
		}
		return newState;
	}
	const [projectData, dispatch] = useReducer(reducer, {});

	const contextValue = { projectData, dispatch };

	return <ProjectDataContext.Provider value={contextValue}>{children}</ProjectDataContext.Provider>;
}

export { ProjectDataContext };
