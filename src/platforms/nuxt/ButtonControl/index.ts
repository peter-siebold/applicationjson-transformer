import { staticImplements } from "../../../generic/decorators/staticImplements";
import { ButtonControlNode } from "../../../generic/interfaces/ComponentNodes/ButtonControl";
import { GenericNodeTransformer } from "../../../generic/interfaces/transformer/GenericNodeTransformer";

@staticImplements<GenericNodeTransformer>()
export class ButtonControl {
    public static transform(node: ButtonControlNode) {
        return `<button id="${node.id}">${node.controlType}</button>`;
    }
}

export default ButtonControl;
