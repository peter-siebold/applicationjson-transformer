import { GenericNode } from "../ComponentNodes/GenericNode";
import { ComponentImport } from "./ComponentImports";
// tslint:disable-next-line:no-empty-interface
export interface GenericNodeTransformerBase {}

export interface GenericNodeTransformer {
    new (): GenericNodeTransformerBase;
    generateMarkup(node: GenericNode, level: number): string;
    // getImports(node: GenericNode): string[];
    getImports(node: GenericNode): ComponentImport[];
}
