
import fs from "fs-extra";

export const getApplicationNameFromJSON = (json: any) => {
    let name;
    let jsonFile;
    let applicationJSON;
    console.log("trying to get the application name from file")
    try {
        jsonFile = fs.readFileSync(json) as Buffer;  
    } catch (error) {
        console.error("An error occurred when opening the application.json file", error);
    }
    if(jsonFile){
        try {
            applicationJSON = JSON.parse(jsonFile.toString());
            if(applicationJSON.application && applicationJSON.application.name){
                name = applicationJSON.application.name;
            }
        } catch (error) {
            console.error("An error ocurred while parsing the application.json", error);
        }
    }
    return name;
}

export const getApplicationJson = (filename: string) => {
    let jsonFile;
    let applicationJSON;
    try {
        jsonFile = fs.readFileSync(filename);  
    } catch (error) {
        console.error("An error occurred when opening the application.json file", error);
    }
    if(jsonFile){
        try {
            applicationJSON = JSON.parse(jsonFile.toString());
        } catch (error) {
            console.error("An error ocurred while parsing the application.json", error);
        }
    }
    return applicationJSON;
}


