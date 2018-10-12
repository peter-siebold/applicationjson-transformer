import { GenericNodeTransformer } from "./GenericNodeTransformer";

export interface TransformerCollection {
    [key: string]: GenericNodeTransformer;
}
