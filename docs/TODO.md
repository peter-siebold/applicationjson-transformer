switch from a simple generateMarkup, getImports to a getComponentDescription() that holds all information on the current node

Problem - Imports and exports for Components
For every Component we need to write an imports and (at least for Vue) an export for that component.
To realise this we need to iterate through all childnodes, get the components and their imports, write all imports to the page file and (for vue) also export the components within the vue instance of the page.

```
export declare interface ComponentDescription {
    name : string;
    markup: string;
    imports: string[];
    exports: string [];
}
```
