import { indentation } from "../../../generic/config/indentation";
import { staticImplements } from "../../../generic/decorators/staticImplements";
import { renderChildren } from "../../../generic/helpers/renderChildren";
import { GenericNode } from "../../../generic/interfaces/ComponentNodes/GenericNode";
import { GenericNodeTransformer } from "../../../generic/interfaces/transformer/GenericNodeTransformer";
import { transformers } from "../index";

@staticImplements<GenericNodeTransformer>()
export class GenericElementNode {
    public static transform(node: GenericNode, level: number = 0) {
        const indent = indentation.repeat(level);
        let markup = `${indent}<div id="${node.id}">`;
        markup = node.children ? markup + "\n" : markup;
        markup += renderChildren(node, transformers, level + 1);
        markup += `${node.children ? indent : ""}</div>\n`;
        return markup;
    }
}

export default GenericElementNode;
