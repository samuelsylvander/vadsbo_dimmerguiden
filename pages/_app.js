import React, { useEffect } from "react";
import "../styles/custom_theme.scss";
import ProjectTemplateContextProvider from "../libs/ProjectTemplateContext";
import ProjectDataContextProvider from "../libs/ProjectDataContext";

export default function App({ Component, pageProps }) {
	return (
		<ProjectTemplateContextProvider>
			<ProjectDataContextProvider>
				<Component {...pageProps} />
			</ProjectDataContextProvider>
		</ProjectTemplateContextProvider>
	);
}
