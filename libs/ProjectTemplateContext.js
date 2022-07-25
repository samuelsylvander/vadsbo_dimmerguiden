import { createContext, useState } from "react";
import projectTemplateJSON from "../project_template.json";

const ProjectTemplateContext = createContext();

export default function ProjectTemplateContextProvider({ children }) {
	const [projectTemplateId, setProjectTemplateId] = useState(0);
	const projectTemplateList = projectTemplateJSON.project_templates;
	const projectTemplate =
		projectTemplateJSON.project_templates.find((template) => template.id === parseFloat(projectTemplateId)) || {};
	const products = projectTemplateJSON.products;
	const roomTemplates = projectTemplateJSON.room_templates;
	const contextValue = { projectTemplateList, projectTemplate, roomTemplates, products, setProjectTemplateId };

	return <ProjectTemplateContext.Provider value={contextValue}>{children}</ProjectTemplateContext.Provider>;
}

export { ProjectTemplateContext };
