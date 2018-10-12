import { AbstractPageNodeTransformer } from "../../../generic/helpers/nodeHelpers";
import { PageNode } from "../../../generic/interfaces/PageNode";

export class PageTransformer extends AbstractPageNodeTransformer {
    public static transform(pageNode: PageNode) {
        console.log("Transform a new Page");
        console.log(pageNode);
    }
}

export default PageTransformer;
