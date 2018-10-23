import { indentation } from "../../../../generic/config/indentation";
import { staticImplements } from "../../../../generic/decorators/staticImplements";
import { flattenArray } from "../../../../generic/helpers/flattenArray";
import { getChildNodeImports } from "../../../../generic/helpers/getImports";
import { renderChildren } from "../../../../generic/helpers/renderChildren";
import { GenericNode } from "../../../../generic/interfaces/ComponentNodes/GenericNode";
import { ComponentImport } from "../../../../generic/interfaces/transformer/ComponentImports";
import { GenericNodeTransformer } from "../../../../generic/interfaces/transformer/GenericNodeTransformer";
import { transformers } from "../../index";

@staticImplements<GenericNodeTransformer>()
export class GenericElementNode {
    public static generateMarkup(node: GenericNode, level: number = 0) {
        const indent = indentation.repeat(level);
        let markup = `${indent}<div id="${node.id}">`;
        markup = node.children ? markup + "\n" : markup;
        markup += renderChildren(node, transformers, level + 1);
        markup += `${node.children ? indent : ""}</div>\n`;
        return markup;
    }
    public static getImports(node: GenericNode) {
        let imports: ComponentImport[] = [];
        // extend import collection with child node imports
        imports = flattenArray([...imports, ...getChildNodeImports(node, transformers)]);
        // remove duplicates
        imports = [...new Set(imports)];
        return imports;
    }
}

export default GenericElementNode;
