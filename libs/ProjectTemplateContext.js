import { createContext } from "react";
import projectTemplateJSON from "./projectTemplate.json";

const ProjectTemplateContext = createContext(projectTemplateJSON);

export default ProjectTemplateContext;
