import { getTransformer } from "../platforms";
import { ApplicationJSON } from "./interfaces/ApplicationJSON";
import { Environment } from "./interfaces/transformer/Environment";
export const transformApplication = (applicationJson: ApplicationJSON, env: Environment) => {
    const transformer = getTransformer(env);
    if (transformer) {
        transformer(applicationJson);
    }
};
