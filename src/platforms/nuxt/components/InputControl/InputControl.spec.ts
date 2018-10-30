import { InputControlNode } from "../../../../generic/interfaces/ComponentNodes/InputControl";
import { InputControl } from "../InputControl";

const mockNode = {
    controlType: "ActionControl",
    id: "ID_ActionControl_1_1",
    placeHolder: "Enter a text",
    value: "Test Value",
};
test("ButtonControl Snapshot", () => {
    const button = InputControl.generateMarkup(mockNode as InputControlNode);
    expect(button).toMatchSnapshot();
});
