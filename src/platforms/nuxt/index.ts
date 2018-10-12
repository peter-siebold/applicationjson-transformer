import { GenericNodeTransformer } from "../../generic/interfaces/transformer/GenericNodeTransformer";
import ApplicationPage from "./ApplicationPage";
import ButtonControl from "./ButtonControl";

export interface TransformerCollection {
    [key: string]: GenericNodeTransformer;
}
export const transformers: TransformerCollection = {
    // ApplicationPage,
    ButtonControl,
};
