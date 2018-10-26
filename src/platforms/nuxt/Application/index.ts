import { ApplicationJSON } from "../../../generic/interfaces/ApplicationJSON";
import { Environment } from "../../../generic/interfaces/transformer/Environment";
import PageTransformer from "../components/ApplicationPage";
import LayoutTransformer from "../components/LayoutTransformer.ts";
export const transformApplication = async (application: ApplicationJSON, env: Environment) => {
    const pages = PageTransformer.getPageNodes(application);
    const layouts = PageTransformer.getLayoutNodes(application);
    if (pages) {
        for (const page of pages) {
            const appName = env.name || page.name;
            const outputPath = `${env.output || env.dirname}/temp/applications/${appName}/pages/${page.name}/`;
            const content = PageTransformer.createPageContent(page);
            PageTransformer.writeToFs(content, outputPath, "index.vue");
        }
    }
    if (layouts) {
        for (const layout of layouts) {
            if (layout.children && layout.type === "internal") {
                const appName = env.name || layout.name;
                const outputPath = `${env.output || env.dirname}/temp/applications/${appName}/layouts/`;
                const content = LayoutTransformer.createPageContent(layout);
                LayoutTransformer.writeToFs(content, outputPath, `${layout.name}.vue`);
            }
            // TODO: check what to do if we have an external layout
        }
    }
    console.log("done with transforming application", application.application.name);
};

export default transformApplication;
