import { TransformerCollection } from "../../generic/interfaces/transformer/TransformerCollection";
import ButtonControl from "./ButtonControl";
import GenericElementNode from "./GenericElementNode";

export const transformers: TransformerCollection = {
    // ApplicationPage,
    ActionControl: ButtonControl,
    GenericElementNode,
};
