# Thoughts on the command line interface for the transformer

## Supported command line switches

User shall be able to define a name for the application, an application description file as input (required), an output folder (if not set, will transform to current directory) and also an output platform as target (next, nuxt, react-native, electron, etc.)

Debatable is, if we need to be able to publish parts withing the app separately (like publish-css, publish-custom-scripts, etc.)

## general workflow

user (gui-builder, or real person) defines an application description, maybe a name for the app (if not, we'll use a name from the app description).
Per default, we'll assume the application to be a react based next.js app (and support different platforms later).
The application description will be passed to the main transformer which will run through the description file and call transformer functions that generate the desired output for a specific component. In addition, there must be a separate run, that will gather all imports for all components on a page (this should be done once, to prevent redundant import statements)

-   check cmd line switches
    -   if necessary help user with displaying information
-   set up project in the file system
-   get the page nodes
    -   for every page node, create a page
        -   for every page, create imports for the found components
        -   for every child node of the page, write the markup for the component.
        -   iif child nodes are found, runt over the child nodes as well and create markup for them before closing the component's tag
