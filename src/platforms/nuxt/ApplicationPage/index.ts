import { staticImplements } from "../../../generic/decorators/staticImplements";
import { AbstractPageNodeTransformer } from "../../../generic/helpers/AbstractPageNodeTransformer";
import { ApplicationPageNode } from "../../../generic/interfaces/ComponentNodes/ApplicationPage";
import { GenericNodeTransformer } from "../../../generic/interfaces/transformer/GenericNodeTransformer";
import { transformers } from "../index";

@staticImplements<GenericNodeTransformer>()
export class PageTransformer extends AbstractPageNodeTransformer {
    public static transform(pageNode: ApplicationPageNode) {
        let markup = `<div id="${pageNode.id}" ${pageNode.class ? pageNode.class : ""}>`;
        if (pageNode.children) {
            for (const childNode of pageNode.children) {
                if (childNode.controlType in transformers) {
                    transformers[childNode.controlType].transform(childNode);
                }
            }
        }
        console.log("Transform a new Page");
        console.log(pageNode);
        markup += `</div>`;
        return markup;
    }
}

export default PageTransformer;
