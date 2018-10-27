import { indentation } from "../../../../generic/config/indentation";
import { staticImplements } from "../../../../generic/decorators/staticImplements";
import { ButtonControlNode } from "../../../../generic/interfaces/ComponentNodes/ButtonControl";
import { ComponentImport } from "../../../../generic/interfaces/transformer/ComponentImports";
import { GenericNodeTransformer } from "../../../../generic/interfaces/transformer/GenericNodeTransformer";

@staticImplements<GenericNodeTransformer>()
export class ButtonControl {
    public static generateMarkup(node: ButtonControlNode, level: number = 0) {
        const indent = indentation.repeat(level);
        return `${indent}<button id="${node.id}">${node.controlType}</button>\n`;
    }
    public static getImports(_pageNode: ButtonControlNode): ComponentImport[] {
        return [
            {
                name: "ButtonControl",
                path: "@componnently/ButtonControl",
            },
        ];
    }
}

export default ButtonControl;
