import { indentation } from "../../../../generic/config/indentation";
import { staticImplements } from "../../../../generic/decorators/staticImplements";
import { getChildNodeImports } from "../../../../generic/helpers/getImports";
import { flattenArray } from "../../../../generic/helpers/ObjectHelper/flattenArray";
import { renderChildren } from "../../../../generic/helpers/renderChildren";
import { GenericNode } from "../../../../generic/interfaces/ComponentNodes/GenericNode";
import { ComponentImport } from "../../../../generic/interfaces/transformer/ComponentImports";
import { GenericNodeTransformer } from "../../../../generic/interfaces/transformer/GenericNodeTransformer";
import { genericNodeTypes } from "../../_config/genericNodeTypes";
import { transformers } from "../../index";

@staticImplements<GenericNodeTransformer>()
export class GenericElementNode {
    public static generateMarkup(node: GenericNode, level: number = 0) {
        const indent = indentation.repeat(level);
        const hasChildren = node.children && node.children.length;
        const tag = GenericElementNode.getTag(node);
        const id = node.id ? ` id="${node.id}"` : "";
        let markup = `${indent}<${tag}${id}${hasChildren ? ">" : " />\n"}`;
        if (hasChildren) {
            markup = node.children ? markup + "\n" : markup;
            markup += renderChildren(node, transformers, level + 1);
            markup += `${node.children ? indent : ""}</${tag}>\n`;
        }

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
    public static getTag(node: GenericNode) {
        if (node.controlType in genericNodeTypes) {
            return genericNodeTypes[node.controlType].tag;
        } else {
            return "div";
        }
    }
}

export default GenericElementNode;
