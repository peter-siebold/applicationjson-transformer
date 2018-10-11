import { GenericNode } from "./GenericNode";
export interface PageNode extends GenericNode {
    children: GenericNode[];
}
