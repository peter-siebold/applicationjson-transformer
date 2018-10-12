import { GenericNode } from "../ComponentNodes/GenericNode";
// tslint:disable-next-line:no-empty-interface
export interface GenericNodeTransformerBase {}

export interface GenericNodeTransformer {
    new (): GenericNodeTransformerBase;
    transform(node: GenericNode): string;
}
