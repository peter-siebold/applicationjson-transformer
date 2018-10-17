import { GenericNode } from "../ComponentNodes/GenericNode";
// tslint:disable-next-line:no-empty-interface
export interface GenericNodeTransformerBase {}

export interface GenericNodeTransformer {
    new (): GenericNodeTransformerBase;
    transform(node: GenericNode, level: number): string;
    getImports(node: GenericNode): string[];
}
