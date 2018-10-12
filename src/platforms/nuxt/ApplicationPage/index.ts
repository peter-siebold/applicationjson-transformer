import { indentation } from "../../../generic/config/indentation";
import { staticImplements } from "../../../generic/decorators/staticImplements";
import { AbstractPageNodeTransformer } from "../../../generic/helpers/AbstractPageNodeTransformer";
import { renderChildren } from "../../../generic/helpers/renderChildren";
import { ApplicationPageNode } from "../../../generic/interfaces/ComponentNodes/ApplicationPage";
import { GenericNodeTransformer } from "../../../generic/interfaces/transformer/GenericNodeTransformer";
import { transformers } from "../index";

@staticImplements<GenericNodeTransformer>()
export class PageTransformer extends AbstractPageNodeTransformer {
    public static transform(pageNode: ApplicationPageNode, level: number = 0) {
        const indent = indentation.repeat(level);
        let markup = `${indent}<div id="${pageNode.id}" ${pageNode.class ? pageNode.class : ""} data-role="page">\n`;
        markup += renderChildren(pageNode, transformers, level + 1);
        markup += `${indent}</div>\n`;
        return markup;
    }
}

export default PageTransformer;
