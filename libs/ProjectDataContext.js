import { createContext, useReducer } from "react";

const ProjectDataContext = createContext();

//reducer function called by dispatch({action: 'replace', field: 'room.name', value: 'new name'})

export default function ProjectDataContextProvider({ children }) {
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
		} else {
			setDeep(action.field, action.value, action.type);
		}

		function setDeep(path, value, action) {
			const pathLevelsArray = path.split(".");
			const lastLevel = pathLevelsArray[pathLevelsArray.length - 1];
			let reference = newState;
			for (let i = 0; i < pathLevelsArray.length - 1; i++) {
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
				case "push":
					if (Array.isArray(reference[lastLevel])) {
						reference[lastLevel].push(value);
					}
					break;
				case "remove":
					if (Array.isArray(reference[lastLevel])) {
						reference[lastLevel].splice(value, 1);
					}
					break;
			}
		}
		return newState;
	}
	const [projectData, dispatch] = useReducer(reducer, {});

	const contextValue = { projectData, dispatch };

	return <ProjectDataContext.Provider value={contextValue}>{children}</ProjectDataContext.Provider>;
}

export { ProjectDataContext };
