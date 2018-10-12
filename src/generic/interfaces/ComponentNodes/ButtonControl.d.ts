import { RouteNode } from "../RouteNode";
import { GenericNode } from "./GenericNode";
export interface ButtonControlNode extends GenericNode {
    children: never;
    route: RouteNode;
}
