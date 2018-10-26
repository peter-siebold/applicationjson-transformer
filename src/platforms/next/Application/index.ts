import { ApplicationJSON } from "../../../generic/interfaces/ApplicationJSON";
import { Environment } from "../../../generic/interfaces/transformer/Environment";
import PageTransformer from "../components/ApplicationPage";
export const transformApplication = async (application: ApplicationJSON, env: Environment) => {
    const pages = PageTransformer.getPageNodes(application);
    if (pages) {
        for (const page of pages) {
            const appName = env.name || page.name;
            const outputPath = `${env.output || env.dirname}/temp/applications/${appName}/pages/${page.name}/`;
            const content = PageTransformer.createPageContent(page);
            PageTransformer.writeToFs(content, outputPath, "index.jsx");
        }
    } else {
        console.error("Could not find any pages in application json");
    }
};

export default transformApplication;
