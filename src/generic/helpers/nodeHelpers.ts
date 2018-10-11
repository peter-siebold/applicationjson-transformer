import { ApplicationJSON } from "../interfaces/ApplicationJSON";
import { PageNode } from "../interfaces/PageNode";
/**
 * get page nodes from an application node
 * @param {ApplicationJSON} json
 * @returns {PageNode[] pages
 */
export const getPages = (json: ApplicationJSON) => {
    let pages: PageNode[] = [];
    if (json && json.application && json.application.pages) {
        pages = [...json.application.pages];
    }
    return pages;
};
export abstract class AbstractPageNodeTransformer {
    public static getPageNodes(applicationJson: ApplicationJSON) {
        let pages: PageNode[] = [];
        if (applicationJson && applicationJson.application && applicationJson.application.pages) {
            pages = [...applicationJson.application.pages];
        }
        return pages;
    }
}
