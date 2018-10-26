import { getTransformer } from "../platforms";
import { ApplicationJSON } from "./interfaces/ApplicationJSON";
import { Environment } from "./interfaces/transformer/Environment";
/**
 *
 * @param {ApplicationJSON} applicationJson
 * @param {Environment} env
 */
const transformApplication = async (applicationJson: ApplicationJSON, env: Environment) => {
    const transformer = getTransformer(env);
    console.log("transform an application");
    if (transformer) {
        await transformer(applicationJson, env);
    }
};

export { transformApplication };
