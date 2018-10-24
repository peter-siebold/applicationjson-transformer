import { ApplicationStyleProperty } from "./ApplicationPage";
import { GenericNode } from "./GenericNode";

export declare type LayoutType = "internal" | "external";
export interface ApplicationLayoutNode extends GenericNode {
    class: never;
    type: LayoutType;
    path?: string;
    styles?: ApplicationStyleProperty;
}
