import { TransformerCollection } from "../../generic/interfaces/transformer/TransformerCollection";
import ButtonControl from "./components/ButtonControl";
import GenericElementNode from "./components/GenericElementNode";

export const transformers: TransformerCollection = {
    // ApplicationPage,
    ActionControl: ButtonControl,
    GenericElementNode,
};
