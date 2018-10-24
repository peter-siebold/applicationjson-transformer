import { TransformerCollection } from "../../generic/interfaces/transformer/TransformerCollection";
import ApplicationStage from "./components/ApplicationStage";
import ButtonControl from "./components/ButtonControl";
import GenericElementNode from "./components/GenericElementNode";
import Header from "./components/Header";
import InputControl from "./components/InputControl";

export const transformers: TransformerCollection = {
    ActionControl: ButtonControl,
    ApplicationStage,
    GenericElementNode,
    Header,
    InputControl,
};
