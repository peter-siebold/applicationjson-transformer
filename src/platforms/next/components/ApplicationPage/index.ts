import fs from "fs-extra";
import { indentation } from "../../../../generic/config/indentation";
import { staticImplements } from "../../../../generic/decorators/staticImplements";
import { AbstractPageNodeTransformer } from "../../../../generic/helpers/AbstractPageNodeTransformer";
import FileHelper from "../../../../generic/helpers/FileHelper";
import { flattenArray } from "../../../../generic/helpers/flattenArray";
import { getChildNodeImports } from "../../../../generic/helpers/getImports";
import ObjectHelper from "../../../../generic/helpers/ObjectHelper";
import { renderChildren } from "../../../../generic/helpers/renderChildren";
import {
    ApplicationPageNode,
    ApplicationStyleProperty,
} from "../../../../generic/interfaces/ComponentNodes/ApplicationPage";
import { ComponentImport } from "../../../../generic/interfaces/transformer/ComponentImports";
import { Environment } from "../../../../generic/interfaces/transformer/Environment";
import { GenericNodeTransformer } from "../../../../generic/interfaces/transformer/GenericNodeTransformer";
import { transformers } from "../../index";
@staticImplements<GenericNodeTransformer>()
export class PageTransformer extends AbstractPageNodeTransformer {
    /**
     *
     *
     * @static
     * @param {ApplicationPageNode} pageNode
     * @param {number} [level=0]
     * @returns
     * @memberof PageTransformer
     */
    public static generateMarkup(pageNode: ApplicationPageNode, level: number = 0) {
        const indent = indentation.repeat(level + 1);
        const sublvl = indentation.repeat(level + 2);
        let markup = `${indent}<Layout>\n`;
        markup += `${sublvl}<div id="${pageNode.id}" ${pageNode.class ? pageNode.class : ""} data-role="page">\n`;
        markup += renderChildren(pageNode, transformers, level + 3);
        markup += `${sublvl}</div>\n`;
        markup += `${sublvl}${PageTransformer.writePageStyle(pageNode, 2)}\n`;
        markup += `${indent}</Layout>\n`;
        return markup;
    }
    public static generateImportStatements(pageNode: ApplicationPageNode) {
        let result = "";
        const imports = PageTransformer.getImports(pageNode);
        imports.forEach(element => {
            result += `import ${element.name} from "${element.path}";\n`;
        });
        return result;
    }
    public static registerComponents(page: ApplicationPageNode, level: number = 0) {
        const components = PageTransformer.getImports(page);
        const indent = indentation.repeat(level + 1);
        let result = `${indent}components: {\n`;
        components.forEach(component => {
            result += `${indentation.repeat(level + 2)}${component.name},\n`;
        });
        result += `${indent}},\n`;
        return result;
    }
    public static getLayout(page: ApplicationPageNode, level: number = 0) {
        const indent = indentation.repeat(level + 1);
        const layout = page.layout ? page.layout : "default";
        return `${indent}layout: "${layout}",\n`;
    }
    public static writePageStyle(page: ApplicationPageNode, level: number = 0) {
        let style = "";
        const indent = indentation.repeat(level + 1);
        const sublvl = indentation.repeat(level + 2);
        if (page.styles) {
            const { styles } = page;
            style += `<style jsx ${!styles.scoped ? "global" : ""}>{\`\n`;
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
            style += `${indent}\`}</style>`;
        }
        return style;
    }
    /**
     *
     *
     * @static
     * @param {ApplicationPageNode} pageNode
     * @returns
     * @memberof PageTransformer
     */
    public static getImports(pageNode: ApplicationPageNode) {
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
     * @memberof PageTransformer
     */
    public static async createPage(page: ApplicationPageNode, env: Environment) {
        const appName = env.name || page.name;
        const outputPath = `${env.output || env.dirname}/applications/${appName}/pages/${page.name}/`;
        // const markup = PageTransformer.generateMarkup(page, 0);
        const script = PageTransformer.generatePageScript(page);
        // const styles = PageTransformer.writePageStyle(page);
        const content = `${script}`;
        try {
            await FileHelper.mkDirByPathSync(outputPath);
            await fs.writeFileSync(FileHelper.buildPath(outputPath, "index.jsx"), content);
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
     * @memberof PageTransformer
     */
    public static generatePageScript(page: ApplicationPageNode) {
        const level = 0;
        const indent = indentation.repeat(level + 1);
        let script = ``;
        script += PageTransformer.generateImportStatements(page);
        script += `export default (props) => (\n`;
        script += PageTransformer.generateMarkup(page);
        // script += `${indentation}<Layout>\n`;
        // script += PageTransformer.getLayout(page, 1);
        // script += PageTransformer.registerComponents(page, 1);
        // script += `${indentation}</Layout>\n`;
        script += `);\n`;
        return script;
    }
}

export default PageTransformer;

/*
<template>
    <div class="admin-page">
        <section class="new-post">
            <AppButton @click="$router.push('/admin/new-post')">Create Post</AppButton>
        </section>
        <section class="existing-posts">
            <h1>Exisiting Posts</h1>
            <PostList 
            :posts="loadedPosts"
            isAdmin/>
        </section>
    </div>
</template>

<script>
import PostList from "@/components/Posts/PostList";
import AppButton from "@/components/UI/AppButton";
export default {
    layout: "admin",
    components: {
        AppButton,
        PostList,
    },
    computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts
    }
  }
}
</script>

<style jsx>
.admin-page {
  padding: 20px;
}

.new-post {
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
}

.existing-posts h1 {
  text-align: center;
}
</style>
*/
