import { ApplicationEnvironment } from "../../../main";

export interface Environment extends ApplicationEnvironment {
    name: string;
    output: string;
    platform: string;
}
