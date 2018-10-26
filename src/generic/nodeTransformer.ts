import { getTransformer } from "../platforms";
import { ApplicationJSON } from "./interfaces/ApplicationJSON";
import { Environment } from "./interfaces/transformer/Environment";
/**
 *
 * @param {ApplicationJSON} applicationJson
 * @param {Environment} env
 */
const transformApplication = (applicationJson: ApplicationJSON, env: Environment) => {
    const transformer = getTransformer(env);
    console.log("transform an application");
    if (transformer) {
        transformer(applicationJson, env);
    }
};

export { transformApplication };
