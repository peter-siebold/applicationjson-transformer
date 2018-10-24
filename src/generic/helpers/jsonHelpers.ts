import fs from "fs-extra";
import { ApplicationJSON } from "../interfaces/ApplicationJSON";

/**
 * get the application name from the application JSON file
 * @param {*} fileName
 * @returns
 */
const getApplicationNameFromJSON = (fileName: any) => {
    let name;
    let jsonFile;
    let applicationJSON: ApplicationJSON;
    console.log("trying to get the application name from file");
    try {
        jsonFile = fs.readFileSync(fileName) as Buffer;
    } catch (error) {
        console.error("An error occurred when opening the application.json file", error);
    }
    if (jsonFile) {
        try {
            applicationJSON = JSON.parse(jsonFile.toString());
            if (applicationJSON.application && applicationJSON.application.name) {
                name = applicationJSON.application.name;
            }
        } catch (error) {
            console.error("An error ocurred while parsing the application.json", error);
        }
    }
    return name;
};
/**
 * get an application json object from a file in the filesystem
 * @param {string} filename
 * @returns {ApplicationJSON | undefined} json
 */
const getApplicationJson = (filename: string) => {
    let jsonFile;
    let applicationJSON: ApplicationJSON | undefined;
    try {
        jsonFile = fs.readFileSync(filename);
    } catch (error) {
        console.error("An error occurred when opening the application.json file", error);
    }
    if (jsonFile) {
        try {
            applicationJSON = JSON.parse(jsonFile.toString());
        } catch (error) {
            console.error("An error ocurred while parsing the application.json", error);
        }
    }
    return applicationJSON;
};
export { getApplicationNameFromJSON, getApplicationJson };
