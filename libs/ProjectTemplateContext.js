import { createContext } from "react";
import projectTemplateJSON from "../project_template.json";

const ProjectTemplateContext = createContext();

export default function ProjectTemplateContextProvider({ children }) {
	return <ProjectTemplateContext.Provider value={projectTemplateJSON}>{children}</ProjectTemplateContext.Provider>;
}

export { ProjectTemplateContext };
