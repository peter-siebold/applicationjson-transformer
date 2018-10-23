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

### Layouts

In next and Nuxt Layouts (wrapping components that provice Styling and thingslike navigation)
