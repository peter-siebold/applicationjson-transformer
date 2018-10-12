import { ApplicationJSON } from "../interfaces/ApplicationJSON";
import { ApplicationPageNode } from "../interfaces/ComponentNodes/ApplicationPage";
import { GenericNodeTransformer } from "../interfaces/transformer/GenericNodeTransformer";

export class AbstractPageNodeTransformer {
    public static getPageNodes(applicationJson: ApplicationJSON) {
        let pages: ApplicationPageNode[] = [];
        if (applicationJson && applicationJson.application && applicationJson.application.pages) {
            pages = [...applicationJson.application.pages];
        }
        return pages;
    }
}
