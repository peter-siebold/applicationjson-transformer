import fs from "fs-extra";
import { indentation } from "../../../../generic/config/indentation";
import { staticImplements } from "../../../../generic/decorators/staticImplements";
import { AbstractPageNodeTransformer } from "../../../../generic/helpers/AbstractPageNodeTransformer";
import FileHelper from "../../../../generic/helpers/FileHelper";
import { getChildNodeImports } from "../../../../generic/helpers/getImports";
import ObjectHelper from "../../../../generic/helpers/ObjectHelper";
import { flattenArray } from "../../../../generic/helpers/ObjectHelper/flattenArray";
import { renderChildren } from "../../../../generic/helpers/renderChildren";
import { ApplicationLayoutNode } from "../../../../generic/interfaces/ComponentNodes/ApplicationLayout";
import {
    ApplicationPageNode,
    ApplicationStyleProperty,
} from "../../../../generic/interfaces/ComponentNodes/ApplicationPage";
import { ComponentImport } from "../../../../generic/interfaces/transformer/ComponentImports";
import { Environment } from "../../../../generic/interfaces/transformer/Environment";
import { GenericNodeTransformer } from "../../../../generic/interfaces/transformer/GenericNodeTransformer";
import { transformers } from "../../index";
@staticImplements<GenericNodeTransformer>()
export class LayoutTransformer extends AbstractPageNodeTransformer {
    /**
     *
     *
     * @static
     * @param {ApplicationPageNode} pageNode
     * @param {number} [level=0]
     * @returns
     * @memberof LayoutTransformer
     */
    public static generateMarkup(pageNode: ApplicationLayoutNode, level: number = 0) {
        const indent = indentation.repeat(level + 1);
        let markup = `<template>\n`;
        const id = pageNode.id ? `id="${pageNode.id}"` : "";
        markup += `${indent}<div ${id}>\n`;
        markup += renderChildren(pageNode, transformers, level + 2);
        markup += `${indent}</div>\n`;
        markup += `</template>\n`;
        return markup;
    }
    public static generateImportStatements(pageNode: ApplicationLayoutNode) {
        let result = "";
        const imports = LayoutTransformer.getImports(pageNode);
        imports.forEach(element => {
            result += `${indentation}import ${element.name} from "${element.path}";\n`;
        });
        return result;
    }
    public static registerComponents(page: ApplicationLayoutNode, level: number = 0) {
        const components = LayoutTransformer.getImports(page);
        const indent = indentation.repeat(level + 1);
        let result = `${indent}components: {\n`;
        components.forEach(component => {
            result += `${indentation.repeat(level + 2)}${component.name},\n`;
        });
        result += `${indent}},\n`;
        return result;
    }

    public static writePageStyle(page: ApplicationLayoutNode, level: number = 0) {
        let style = "";
        const indent = indentation.repeat(level + 1);
        const sublvl = indentation.repeat(level + 2);
        if (page.styles) {
            const { styles } = page;
            style += `<style ${styles.scoped ? "scoped" : ""}>\n`;
            styles.rules.forEach(rule => {
                let css = "";
                css += `${indent}${rule.selector} {\n`;
                for (const prop in rule.properties) {
                    if (rule.properties[prop]) {
                        css += `${sublvl}${prop} : "${rule.properties[prop]}";\n`;
                    }
                }
                css += `${indent}}\n`;
                style += css;
            });
            style += `</style>`;
        }
        return style;
    }
    /**
     *
     *
     * @static
     * @param {ApplicationPageNode} pageNode
     * @returns
     * @memberof LayoutTransformer
     */
    public static getImports(pageNode: ApplicationLayoutNode) {
        let imports: ComponentImport[] = [];
        // extend import collection with child node imports
        imports = flattenArray([...imports, ...getChildNodeImports(pageNode, transformers)]);
        // remove duplicates
        imports = ObjectHelper.removeDuplicates(imports, "name");
        return imports;
    }
    /**
     *
     *
     * @static
     * @param {ApplicationPageNode} page
     * @param {Environment} env
     * @memberof LayoutTransformer
     */
    public static async createPage(page: ApplicationLayoutNode, env: Environment) {
        const appName = env.name || page.name;
        const outputPath = `${env.output || env.dirname}/applications/${appName}/layouts/`;
        const markup = LayoutTransformer.generateMarkup(page, 0);
        const script = LayoutTransformer.generatePageScript(page);
        const styles = LayoutTransformer.writePageStyle(page);
        const content = `${markup}${script}${styles}`;
        try {
            await FileHelper.mkDirByPathSync(outputPath);
            await fs.writeFileSync(FileHelper.buildPath(outputPath, `${page.name}.vue`), content);
        } catch (error) {
            console.log("Error while creating the output file", error);
        }
    }

    /**
     *
     *
     * @static
     * @param {ApplicationPageNode} page
     * @returns
     * @memberof LayoutTransformer
     */
    public static generatePageScript(page: ApplicationLayoutNode) {
        const level = 0;
        const indent = indentation.repeat(level + 1);
        let script = `<script>\n`;
        script += LayoutTransformer.generateImportStatements(page);
        script += `${indentation}export default {\n`;
        script += LayoutTransformer.registerComponents(page, 1);
        script += `${indentation}};\n`;
        script += `</script>\n`;
        return script;
    }
}

export default LayoutTransformer;
