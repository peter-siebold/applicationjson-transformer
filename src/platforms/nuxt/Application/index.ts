import { ApplicationJSON } from "../../../generic/interfaces/ApplicationJSON";
import PageTransformer from "../ApplicationPage";
export const transformApplication = (application: ApplicationJSON) => {
    const pages = PageTransformer.getPageNodes(application);
    if (pages) {
        for (const page of pages) {
            console.log("transform page...");
            const pageMarkup = `<template>\n${PageTransformer.transform(page, 1)}\n</template>`;
            // console.log(pageMarkup);
            console.log("markup done, now get imports");
            const imports = PageTransformer.getImports(page);

            console.log("imports", imports);

            const pageScript = `\n<script>\n${imports.join("\n")}
                \n</script>`;
            console.log(pageScript);
        }
    } else {
        console.error("Could not find any pages in application json");
    }
};

export default transformApplication;
