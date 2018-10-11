import { Environment } from "../../generic/interfaces/transformer/Environment";
import { transformers } from "./transformers";
export const getPageTransformer = (environment: Environment) => {
    switch (environment.platform) {
        case "next":
            return transformers.next;
            break;
        default:
            throw new Error("Cannot find transformer for platform " + environment.platform);
    }
};
export default getPageTransformer;
