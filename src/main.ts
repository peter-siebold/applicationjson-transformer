/**
 * @fileoverview main.ts
 * provide entry points for the application. Handle command line arguments.
 */
import yargs from "yargs";
import { getApplicationJson, getApplicationNameFromJSON } from "./generic/helpers/jsonHelpers";
import { Environment } from "./generic/interfaces/transformer/Environment";
import { transformApplication } from "./generic/nodeTransformer";
/**
 * basic environment information for the page transformer
 * @export
 * @interface ApplicationEnvironment
 */
export declare interface ApplicationEnvironment {
    dirname: string;
    env: NodeJS.ProcessEnv;
}
const defaults = {
    platform: "nuxt",
};
/**
 * command line based menu for the application
 * @param {ApplicationEnvironment} appEnv
 */
const menu = (appEnv: ApplicationEnvironment) => {
    const argv = yargs
        .option("name", {
            alias: "n",
            describe: "program specifications",
        })
        .option("input", {
            alias: "i",
            describe: "run your program",
        })
        .option("output", {
            alias: "o",
            describe: "provide a path to file",
        })
        .option("platform", {
            alias: "p",
            default: defaults.platform,
            describe: "target platform",
        })
        .demandOption(["name", "input"], "Please at least a name and a path to the application.json")
        .help().argv;

    const input = argv.input;
    const name = argv.name || getApplicationNameFromJSON(input);
    const output = argv.output || `${appEnv.dirname}`;
    const platform = argv.platform;
    const applicationJson = getApplicationJson(input);
    const environment: Environment = {
        name,
        output,
        platform,
        ...appEnv,
    };
    if (applicationJson) {
        transformApplication(applicationJson, environment);
    }
};

export { menu };
