import { getPageTransformer } from "../platforms/config/index";
import { ApplicationJSON } from "./interfaces/ApplicationJSON";
import { Environment } from "./interfaces/transformer/Environment";
export const transformApplication = (applicationJson: ApplicationJSON, env: Environment) => {
    const transformer = getPageTransformer(env);
    if (transformer) {
        transformer(applicationJson);
    }
};
