import { ButtonControlNode } from "../../../../generic/interfaces/ComponentNodes/ButtonControl";
import { ButtonControl } from "../ButtonControl";

const mockNode = {
    controlType: "ActionControl",
    id: "ID_ActionControl_1_1",
    route: {
        path: "/viewpageBD246FF2",
    },
};
test("ButtonControl Snapshot", () => {
    const button = ButtonControl.generateMarkup(mockNode as ButtonControlNode);
    expect(button).toMatchSnapshot();
});
