import { ApplicationJSON } from "../interfaces/ApplicationJSON";
import { ApplicationPageNode } from "../interfaces/ComponentNodes/ApplicationPage";
/**
 * get page nodes from an application node
 * @param {ApplicationJSON} json
 * @returns {PageNode[] pages
 */
export const getPages = (json: ApplicationJSON) => {
    let pages: ApplicationPageNode[] = [];
    if (json && json.application && json.application.pages) {
        pages = [...json.application.pages];
    }
    return pages;
};
