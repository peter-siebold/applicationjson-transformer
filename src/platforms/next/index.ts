import { TransformerCollection } from "../../generic/interfaces/transformer/TransformerCollection";
import ButtonControl from "./components/ButtonControl";
import GenericElementNode from "./components/GenericElementNode";
import InputControl from "./components/InputControl";

export const transformers: TransformerCollection = {
    // ApplicationPage,
    ActionControl: ButtonControl,
    GenericElementNode,
    InputControl,
};
