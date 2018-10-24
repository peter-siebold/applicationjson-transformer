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

What needs to be done, when we find a new page node?
platform independent
create a file for the page / screen.
get the imports (need to do this first for react based output -> react, react-native, secondly for vue based output)
get the markup for the page (first for vue, second for react)
for vue we need to also export the component within the vue instance

    vue:

    <template>
        { markup}
    </template>
    <script>
        { imports }
        const vue = Vue.new({
            components : [
                { exports }
            ],
            data: {
                { /* might be a place for defining page global data sources like REST or GraphQl Services */}
            }
        }
        )

to mkae things more clear first of all, markup generating stuff should be moved to a new folder
file creating stuff to another folder
setup for the application in also in another folder

paltforms
nuxt
application
setup
components
ButtonControl
InputControl
...

## Testing

Need to find one test frameworks for testing the whole transformer with unit tests and prefereably snapshot tests.

### Dokumentation

Need to document all classes and MEthods and then either use typedoc or jsdoc for documentation of the project

### Versioning

Need to check in the whole project into a new github repository, before being back. At the moments this all is still mine.
