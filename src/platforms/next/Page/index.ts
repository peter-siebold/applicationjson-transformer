import { AbstractPageNodeTransformer } from "../../../generic/helpers/AbstractPageNodeTransformer";
import { ApplicationPageNode } from "../../../generic/interfaces/ComponentNodes/ApplicationPage";

export class PageTransformer extends AbstractPageNodeTransformer {
    public static transform(pageNode: ApplicationPageNode) {
        console.log("Transform a new Page");
        console.log(pageNode);
    }
}

export default PageTransformer;
