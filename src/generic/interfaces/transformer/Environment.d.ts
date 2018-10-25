import { ApplicationEnvironment } from "./ApplicationEnvironment";

export interface Environment extends ApplicationEnvironment {
    name: string;
    output: string;
    platform: string;
}
