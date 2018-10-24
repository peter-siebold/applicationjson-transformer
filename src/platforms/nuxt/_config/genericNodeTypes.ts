export declare interface GenericNodeTypeCollection {
    [key: string]: GenericNodeTypeDescription;
}
export declare interface GenericNodeTypeDescription {
    tag: string;
    imports?: string[];
    exports?: string[];
}
export const genericNodeTypes: GenericNodeTypeCollection = {
    div: { tag: "div" },
    header: { tag: "header" },
    nuxt: { tag: "nuxt" },
    span: { tag: "span" },
};
