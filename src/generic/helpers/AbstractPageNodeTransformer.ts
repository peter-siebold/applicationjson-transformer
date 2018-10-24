import { ApplicationJSON } from "../interfaces/ApplicationJSON";
import { ApplicationLayoutNode } from "../interfaces/ComponentNodes/ApplicationLayout";
import { ApplicationPageNode } from "../interfaces/ComponentNodes/ApplicationPage";
import { GenericNodeTransformer } from "../interfaces/transformer/GenericNodeTransformer";

/**
 * General Page Node Transformer Class. Provides basic Functionality that is common for all Page Transformers
 * @class AbstractPageNodeTransformer
 */
class AbstractPageNodeTransformer {
    public static getPageNodes(applicationJson: ApplicationJSON) {
        let pages: ApplicationPageNode[] = [];
        if (applicationJson && applicationJson.application && applicationJson.application.pages) {
            pages = [...applicationJson.application.pages];
        }
        return pages;
    }
    public static getLayoutNodes(applicationJson: ApplicationJSON) {
        let layouts: ApplicationLayoutNode[] = [];
        if (applicationJson && applicationJson.application && applicationJson.application.layouts) {
            layouts = [...applicationJson.application.layouts];
        }
        return layouts;
    }
}
export { AbstractPageNodeTransformer };
