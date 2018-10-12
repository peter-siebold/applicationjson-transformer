export interface GenericNode {
    id: string;
    guid: string;
    name: string;
    controlType: string;
    children?: GenericNode[];
    class?: string;
}
