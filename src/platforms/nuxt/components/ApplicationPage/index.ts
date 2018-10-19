import fs from "fs-extra";
import { indentation } from "../../../../generic/config/indentation";
import { staticImplements } from "../../../../generic/decorators/staticImplements";
import { AbstractPageNodeTransformer } from "../../../../generic/helpers/AbstractPageNodeTransformer";
import FileHelper from "../../../../generic/helpers/FileHelper";
import { flattenArray } from "../../../../generic/helpers/flattenArray";
import { getChildNodeImports } from "../../../../generic/helpers/getImports";
import { renderChildren } from "../../../../generic/helpers/renderChildren";
import { ApplicationPageNode } from "../../../../generic/interfaces/ComponentNodes/ApplicationPage";
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
        let markup = `<template>\n`;
        markup += `${indent}<div id="${pageNode.id}" ${pageNode.class ? pageNode.class : ""} data-role="page">\n`;
        markup += renderChildren(pageNode, transformers, level + 2);
        markup += `${indent}</div>\n`;
        markup += `</template>\n`;
        return markup;
    }
    public static generateImportStatements(pageNode: ApplicationPageNode) {
        let result = "";
        const imports = PageTransformer.getImports(pageNode);
        imports.forEach(element => {
            result += `${indentation}import ${element.name} from "${element.path}";\n`;
        });
        return result;
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
        imports = removeDuplicates(imports, "name");

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
        const markup = PageTransformer.generateMarkup(page, 0);
        const script = PageTransformer.generatePageScript(page);
        const styles = "";
        const writePage = false;
        const content = `${markup}${script}${styles}`;
        try {
            await FileHelper.mkDirByPathSync(outputPath);
            await fs.writeFileSync(FileHelper.buildPath(outputPath, "index.vue"), content);
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
        let script = `<script>\n`;
        script += PageTransformer.generateImportStatements(page);
        script += `</script>\n`;
        return script;
    }
}
function removeDuplicates(myArr: any[], prop: string) {
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
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

<style scoped>
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
