/**
 * @fileoverview main.ts
 * provide entry points for the application. Handle command line arguments.
 */
import yargs from "yargs";
import { getApplicationJson, getApplicationNameFromJSON } from "./generic/helpers/jsonHelpers";
import { transformApplication } from "./generic/nodeTransformer";

const defaults = {
    platform: "next",
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
    const command = argv._[0];
    const input = argv.input;
    const name = argv.name || getApplicationNameFromJSON(input);
    const output = argv.output || `${__dirname}`;
    // const mode = argv.mode;
    const platform = argv.platform;
    // console.log("platform", platform);
    const applicationJson = getApplicationJson(input);
    // console.log("application pages", getPages(applicationJson));
    if (applicationJson) {
        transformApplication(applicationJson);
    }

    // console.log("mode", mode)

    // switch (mode ){
    //     case "all":
    //         console.log("publish all applications");
    //         break;
    //     case "app":
    //     console.log("publish application with the given parameters");
    //     console.log(argv);
    //         // publishApp.publish(name, input, output, platform);
    //         break;
    //     case "css":
    //         console.log("bundle css for an app");
    //         break;
    //     case "js":
    //         console.log("bundle js for an app");
    //         break;
    //     default:
    //         console.log("unrecognized option");
    // }
};

export { menu };
