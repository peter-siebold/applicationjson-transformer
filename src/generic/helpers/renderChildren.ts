import { GenericNode } from "../interfaces/ComponentNodes/GenericNode";
import { TransformerCollection } from "../interfaces/transformer/TransformerCollection";

export const renderChildren = (node: GenericNode, transformers: TransformerCollection, level: number = 0) => {
    let markup = "";
    if (node.children) {
        for (const childNode of node.children) {
            const nodeTransformer =
                childNode.controlType in transformers ? childNode.controlType : "GenericElementNode";
            markup += transformers[nodeTransformer].transform(childNode, level);
        }
    }
    return markup;
};
