import { createContext, useReducer, useState } from "react";

const ProjectDataContext = createContext();

//reducer function called by dispatch({action: 'replace', field: 'room.name', value: 'new name'})

export default function ProjectDataContextProvider({ children }) {
	const [isLoading, setIsLoading] = useState(true);
	const [projectData, dispatch] = useReducer(reducer, {});

	const contextValue = { isLoading, projectData, dispatch };

	function reducer(state, action) {
		// console.log(action);
		let newState = {};
		if (state) {
			newState = JSON.parse(JSON.stringify(state)); //deep copy
		} else {
			if (!action) {
				return {};
			}
		}

		if (action.type === "initialise") {
			newState = JSON.parse(JSON.stringify(action.value));
			setIsLoading(false);
		} else {
			setDeep(action.field, action.value, action.type);
		}

		function setDeep(path, value, action) {
			const pathLevelsArray = path.split(".");
			const lastLevel = pathLevelsArray[pathLevelsArray.length - 1];
			let reference = newState;
			for (let i = 0; i < pathLevelsArray.length - 1; i++) {
				if (!reference.hasOwnProperty(pathLevelsArray[i])) {
					reference[pathLevelsArray[i]] = {};
				}
				reference = reference[pathLevelsArray[i]];
			}
			switch (action) {
				case "replace":
					reference[lastLevel] = value;
					break;
				case "increase":
					if (typeof reference[lastLevel] === "number") {
						reference[lastLevel]++;
					}
					break;
				case "decrease":
					if (typeof reference[lastLevel] === "number") {
						reference[lastLevel]++;
					}
					break;
				case "add":
					if (Array.isArray(reference[lastLevel])) {
						if (!reference[lastLevel].includes(value)) {
							reference[lastLevel].push(value);
						}
					}
					break;
				case "remove":
					if (Array.isArray(reference[lastLevel])) {
						const foundIndex = reference[lastLevel].indexOf(value);
						if (foundIndex >= 0) {
							reference[lastLevel].splice(foundIndex, 1);
						}
					}
					break;
				case "remove-index":
					if (Array.isArray(reference[lastLevel])) {
						reference[lastLevel].splice(value, 1);
					}
					break;
			}
		}
		return newState;
	}

	return <ProjectDataContext.Provider value={contextValue}>{children}</ProjectDataContext.Provider>;
}

export { ProjectDataContext };
