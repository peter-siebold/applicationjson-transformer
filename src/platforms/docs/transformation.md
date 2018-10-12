Transformation of an application - taking nuxt as an example

1. the application setup in the file system
2. the creation of the page file in the filesystem
3. generate the markup for the <template> part.
4. write a <script> part with
   4.1 all imports for the components
   4.2 a vue instance for the page
   4.3 registration of all components
   4.4 all exports for the components
5. if necessary write a <css> Part

for the markup generator, in general the program flow is the same for all platforms
walk through the page's child nodes and call node (and platform) specific transformer methods, if available, else call a platform specific generic fallback item (e.g. div for web and View for react-native)
