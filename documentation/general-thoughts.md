# Project SPA - Transformer

A transformation tool that takes an application description (a json object) and creates applications from that description file.

## Thoughts on the development of the transformer

Since we don't really know yet which output formats we need to be able to support, the transformer needs to be as generic as possible.
Like with XSLT we could iterate through the application description file and call functions for that specific node.

transformer/
templates/
InputControl/
index.ts
needs to be able to call the right Methods, depending on the desired output
const InputControlReact = import InputControlReact from "./InputControlReact"
const InputControl = (node) => {
// get the output from the env variable or the process variable
switch(outputformat):
case "react"
InputControlReact(node)
break
case "react-native":
InputControlReact(node)
default:
// need to define what to do if we don't have a renderer for a specific output format
// (e.g. native output that doesn't support a specific control)
// maybe render just text then
}
export default InputControl;
InputControl.react.ts
InputControl.react-native.ts
InputControl.vue.ts

### Transformation to JSON

We might need to be able to tranform Markup to a compatible JSON for the GUI Builder.

### Layouts

In next and Nuxt Layouts (wrapping components that provice Styling and thingslike navigation)

It could be benefitial to allow both: Layout nodes that will result in creating a new Layout PAge within the project or a Layout Node that just refers to another file via path. In the latter case we need to check if we have to copy the Layout File into our Next/Nuxt App, or if we just can reference resources from anywhere.

## publishing into a temporary directory

It would make more sense to publish in a temp directory and just move all files, If all pages have been published successfully.
We still need an idea about the desired output directory, to make sure that the import paths are still valid.
