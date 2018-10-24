import { GenericNode } from "../interfaces/ComponentNodes/GenericNode";
import { TransformerCollection } from "../interfaces/transformer/TransformerCollection";

/**
 * render all child nodes of a given node
 * @param {GenericNode} node
 * @param {TransformerCollection} transformers
 * @param {number} [level=0]
 * @returns
 */
const renderChildren = (node: GenericNode, transformers: TransformerCollection, level: number = 0) => {
    let markup = "";
    if (node.children) {
        for (const childNode of node.children) {
            const nodeTransformer =
                childNode.controlType in transformers ? childNode.controlType : "GenericElementNode";
            markup += transformers[nodeTransformer].generateMarkup(childNode, level);
        }
    }
    return markup;
};
export { renderChildren };
