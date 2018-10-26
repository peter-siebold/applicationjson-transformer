import fs from "fs-extra";
import { ApplicationJSON } from "../interfaces/ApplicationJSON";
import { ApplicationLayoutNode } from "../interfaces/ComponentNodes/ApplicationLayout";
import { ApplicationPageNode } from "../interfaces/ComponentNodes/ApplicationPage";
import FileHelper from "./FileHelper";

/**
 * General Page Node Transformer Class. Provides basic Functionality that is common for all Page Transformers
 * @class AbstractPageNodeTransformer
 */
class AbstractPageNodeTransformer {
    public static getPageNodes(applicationJson: ApplicationJSON) {
        let pages: ApplicationPageNode[] = [];
        if (applicationJson && applicationJson.application && applicationJson.application.pages) {
            pages = [...applicationJson.application.pages];
        }
        return pages;
    }
    public static getLayoutNodes(applicationJson: ApplicationJSON) {
        let layouts: ApplicationLayoutNode[] = [];
        if (applicationJson && applicationJson.application && applicationJson.application.layouts) {
            layouts = [...applicationJson.application.layouts];
        }
        return layouts;
    }
    public static async writeToFs(content: string, outputPath: string, filename: string) {
        try {
            await FileHelper.mkDirByPathSync(outputPath);
            await fs.writeFileSync(FileHelper.buildPath(outputPath, filename), content);
        } catch (error) {
            console.log("Error while creating the output file", error);
        }
    }
}
export { AbstractPageNodeTransformer };
