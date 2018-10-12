import { Environment } from "../generic/interfaces/transformer/Environment";
import { transformers } from "./config/transformers";
export const getTransformer = (environment: Environment) => {
    switch (environment.platform) {
        case "next":
            return transformers.next;
        case "nuxt":
            return transformers.nuxt;
        case "react-native":
            return transformers["react-native"];
        default:
            throw new Error("Cannot find transformer for platform " + environment.platform);
    }
};
export default getTransformer;
