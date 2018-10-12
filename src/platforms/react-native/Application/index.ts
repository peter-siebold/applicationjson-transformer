import { ApplicationJSON } from "../../../generic/interfaces/ApplicationJSON";
import PageTransformer from "../Screen";
export const transformApplication = (application: ApplicationJSON) => {
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
