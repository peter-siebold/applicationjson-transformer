import { indentation } from "../../../generic/config/indentation";
import { staticImplements } from "../../../generic/decorators/staticImplements";
import { AbstractPageNodeTransformer } from "../../../generic/helpers/AbstractPageNodeTransformer";
import { flattenArray } from "../../../generic/helpers/flattenArray";
import { getChildNodeImports } from "../../../generic/helpers/getImports";
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
    public static getImports(pageNode: ApplicationPageNode) {
        let imports = ["ApplicationPage"];
        // extend import collection with child node imports
        imports = flattenArray([...imports, ...getChildNodeImports(pageNode, transformers)]);
        // remove duplicates
        imports = [...new Set(imports)];
        return imports;
    }
}

export default PageTransformer;
