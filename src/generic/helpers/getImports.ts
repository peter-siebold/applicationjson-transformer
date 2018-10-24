import { GenericNode } from "../interfaces/ComponentNodes/GenericNode";
import { TransformerCollection } from "../interfaces/transformer/TransformerCollection";
import { flattenArray } from "./ObjectHelper/flattenArray";

/**
 * get the necessary imports for a node
 * @param {GenericNode} node
 * @param {TransformerCollection} transformers
 * @returns
 */
const getChildNodeImports = (node: GenericNode, transformers: TransformerCollection) => {
    const imports = [];
    if (node.children) {
        for (const childNode of node.children) {
            const nodeTransformer =
                childNode.controlType in transformers ? childNode.controlType : "GenericElementNode";
            if (!transformers[nodeTransformer].getImports) {
                console.log(childNode.controlType + "does not support imports");
            }
            try {
                imports.push(transformers[nodeTransformer].getImports(childNode));
            } catch (error) {
                console.log("OHNOESS...", error);
            }
        }
    }
    return flattenArray(imports);
};
export { getChildNodeImports };
