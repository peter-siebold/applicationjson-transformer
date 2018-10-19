import { RouteNode } from "../RouteNode";
import { GenericNode } from "./GenericNode";
export interface InputControlNode extends GenericNode {
    children: never;
    value: string;
    placeholder?: string;
    type?: inputTypes;
}

export declare type inputTypes = "text" | "mail" | "number" | "tel";
