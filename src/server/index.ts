/**
 * A simple Server that can receive an application description JSON file via POST
 * @fileoverview
 *
 */
import "@babel/polyfill";
// Import everything from express and assign it to the express variable
import bodyParser from "body-parser";
import express from "express";

import { defaults } from "../__config__";
import { getApplicationJson } from "../generic/helpers/jsonHelpers";
import { ApplicationJSON } from "../generic/interfaces/ApplicationJSON";
import { ApplicationEnvironment } from "../generic/interfaces/transformer/ApplicationEnvironment";
import { Environment } from "../generic/interfaces/transformer/Environment";
import { transformApplication } from "../generic/nodeTransformer";

// Create a new express application instance
const app = express();
// The port the express app will listen on
// app.use(bodyParser({extended: true}));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Mount the WelcomeController at the /welcome route

app.get("/", (req, res) => res.send("Hello World!"));

app.post("/transform", (req, res) => {
    try {
        const input = req.body;
        const name = (req.headers.name as string) || (getApplicationName(input) as string);
        const platform = req.headers.platform as string;
        const output = (req.headers.output || __dirname) as string;
        const dirname = __dirname;
        const appEnv = {
            dirname,
            env: process.env,
        };
        const applicationJson = input;
        const environment: Environment = {
            name,
            output,
            platform,
            ...appEnv,
        };
        if (applicationJson) {
            console.log(`transform application ${name} as a ${platform} application`);
            transformApplication(applicationJson, environment);
            res.sendStatus(200);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
// Serve the application at the given port
app.listen(port, () => {
    // Success callback
    console.log(`Listening at http://localhost:${port}/`);
});
const getApplicationName = (applicationJSON: ApplicationJSON) => {
    let name;
    if (applicationJSON.application && applicationJSON.application.name) {
        name = applicationJSON.application.name;
    }

    return name;
};
