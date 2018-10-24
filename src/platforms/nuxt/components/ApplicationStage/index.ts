import { indentation } from "../../../../generic/config/indentation";
import { staticImplements } from "../../../../generic/decorators/staticImplements";
import { InputControlNode } from "../../../../generic/interfaces/ComponentNodes/InputControl";
import { ComponentImport } from "../../../../generic/interfaces/transformer/ComponentImports";
import { GenericNodeTransformer } from "../../../../generic/interfaces/transformer/GenericNodeTransformer";

@staticImplements<GenericNodeTransformer>()
export class ApplicationStage {
    public static generateMarkup(node: InputControlNode, level: number = 0) {
        const indent = indentation.repeat(level);
        const inputType = node.type || "text";
        const placeHolder = node.placeHolder ? `placeholder="${node.placeHolder}"` : "";
        return `${indent}<nuxt />\n`;
    }
    public static getImports(pageNode: InputControlNode) {
        const imports: ComponentImport[] = [];
        return imports;
    }
}

export default ApplicationStage;
