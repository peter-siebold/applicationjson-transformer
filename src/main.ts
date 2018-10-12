/**
 * @fileoverview main.ts
 * provide entry points for the application. Handle command line arguments.
 */
import yargs from "yargs";
import { getApplicationJson, getApplicationNameFromJSON } from "./generic/helpers/jsonHelpers";
import { Environment } from "./generic/interfaces/transformer/Environment";
import { transformApplication } from "./generic/nodeTransformer";
const defaults = {
    platform: "nuxt",
};
const menu = () => {
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
        // .option('mode', {
        //     alias: 'm',
        //     default: "app",
        //     describe: 'specify a transformer mode'
        // })
        .demandOption(["name", "input"], "Please at least a name and a path to the application.json")
        .help().argv;

    const input = argv.input;
    const name = argv.name || getApplicationNameFromJSON(input);
    const output = argv.output || `${__dirname}`;
    const platform = argv.platform;
    const applicationJson = getApplicationJson(input);
    const environment: Environment = {
        name,
        output,
        platform,
    };
    if (applicationJson) {
        transformApplication(applicationJson, environment);
    }
};

export { menu };
