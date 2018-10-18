import { ApplicationJSON } from "../../../generic/interfaces/ApplicationJSON";
import { Environment } from "../../../generic/interfaces/transformer/Environment";
import PageTransformer from "../Page";
export const transformApplication = (application: ApplicationJSON, env: Environment) => {
    const pages = PageTransformer.getPageNodes(application);
    if (pages) {
        for (const page of pages) {
            PageTransformer.transform(page);
        }
    } else {
        console.error("Could not find any pages in application json");
    }
};

export default transformApplication;
