import { ApplicationJSON } from "../../../generic/interfaces/ApplicationJSON";
import { Environment } from "../../../generic/interfaces/transformer/Environment";
import PageTransformer from "../components/ApplicationPage";
import LayoutTransformer from "../components/LayoutTransformer.ts";
export const transformApplication = (application: ApplicationJSON, env: Environment) => {
    const pages = PageTransformer.getPageNodes(application);
    const layouts = PageTransformer.getLayoutNodes(application);
    if (pages) {
        for (const page of pages) {
            // TODO: create new file for the page
            // TODO: get the markup for the page and write to file
            // TODO:
            PageTransformer.createPage(page, env);
            // console.log("transform page...");
            // const pageMarkup = `<template>\n${PageTransformer.transform(page, 1)}\n</template>`;
            // // console.log(pageMarkup);
            // console.log("markup done, now get imports");
            // const imports = PageTransformer.getImports(page);

            // console.log("imports", imports);

            // const pageScript = `\n<script>\n${imports.join("\n")}
            //     \n</script>`;
            // console.log(pageScript);
        }
    }
    if (layouts) {
        for (const layout of layouts) {
            if (layout.children && layout.type === "internal") {
                // create layout components
                LayoutTransformer.createPage(layout, env);
                console.log("internal layout resource", layout);
            } else {
                console.log("external layout resource", layout);
            }
            // TODO: check what to do if we have an external layout
        }
    }
};

export default transformApplication;
