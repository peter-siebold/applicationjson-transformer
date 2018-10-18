import fs from "fs-extra";
import { indentation } from "../../../../generic/config/indentation";
import { staticImplements } from "../../../../generic/decorators/staticImplements";
import { AbstractPageNodeTransformer } from "../../../../generic/helpers/AbstractPageNodeTransformer";
import FileHelper from "../../../../generic/helpers/FileHelper";
import { flattenArray } from "../../../../generic/helpers/flattenArray";
import { getChildNodeImports } from "../../../../generic/helpers/getImports";
import { renderChildren } from "../../../../generic/helpers/renderChildren";
import { ApplicationPageNode } from "../../../../generic/interfaces/ComponentNodes/ApplicationPage";
import { Environment } from "../../../../generic/interfaces/transformer/Environment";
import { GenericNodeTransformer } from "../../../../generic/interfaces/transformer/GenericNodeTransformer";
import { transformers } from "../../index";
@staticImplements<GenericNodeTransformer>()
export class PageTransformer extends AbstractPageNodeTransformer {
    public static generateMarkup(pageNode: ApplicationPageNode, level: number = 0) {
        const indent = indentation.repeat(level);
        let markup = `${indent}<div id="${pageNode.id}" ${pageNode.class ? pageNode.class : ""} data-role="page">\n`;
        markup += renderChildren(pageNode, transformers, level + 1);
        markup += `${indent}</div>\n`;
        return markup;
    }
    public static generatePageScript(page: ApplicationPageNode) {
        const imports = PageTransformer.getImports(page);
        return "";
    }
    public static getImports(pageNode: ApplicationPageNode) {
        let imports = ["ApplicationPage"];
        // extend import collection with child node imports
        imports = flattenArray([...imports, ...getChildNodeImports(pageNode, transformers)]);
        // remove duplicates
        imports = [...new Set(imports)];
        return imports;
    }
    public static createPage(page: ApplicationPageNode, env: Environment) {
        const appName = env.name || page.name;
        const outputPath = `${env.output || env.dirname}/applications/${appName}/pages/${page.name}/`;
        const markup = PageTransformer.generateMarkup(page, 0);
        // const script = PageTransformer.generatePageScript(page);
        // console.log(markup);
        console.log("create new page file for path", outputPath);
        const writePage = false;
        // if(writePage){

        try {
            fs.writeFileSync(FileHelper.buildPath(outputPath, "index.vue"), markup);
        } catch (error) {
            console.log("Error while creating the output file", error);
        }
        // }

        // const pageName = page.name;
        // const outputPath = fileHelpers.buildPath(targetDir, pageName);
        // const template = generateTemplate(page);
        // const script = generateScriptPart(page);
        // const markup = `${template}\n${script}`;
        // TODO: create page file in the file system
    }
}

export default PageTransformer;
