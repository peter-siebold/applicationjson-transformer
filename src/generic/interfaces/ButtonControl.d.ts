import {GenericNode} from "./GenericNode";
import {RouteNode} from "./RouteNode";
export interface ButtonControl extends GenericNode {
    children: never;
    route: RouteNode;
}