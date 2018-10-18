import fs from "fs-extra";
import path from "path";

// tslint:disable-next-line:ban-types
export const fromDir = (startPath: string, filter: RegExp, callback: Function) => {
    if (!fs.existsSync(startPath)) {
        console.log("no dir ", startPath);
        return;
    }

    const files = fs.readdirSync(startPath);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < files.length; i++) {
        const filename = path.join(startPath, files[i]);
        const stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            fromDir(filename, filter, callback);
        } else if (filter.test(filename)) callback(filename);
    }
};
export const createDirectoryIfNotExists = async (dir: string) => {
    try {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        return dir;
    } catch (error) {
        console.error("An error occurred while creating directory", error);
        return error;
    }
};
export const buildPath = (...parts: string[]) => {
    let result = "";
    parts.forEach(part => {
        if (result.match(/\/+$/) || result === "") {
            result += part;
        } else {
            result += "/" + part;
        }
    });
    return result;
};
export default {
    buildPath,
    createDirectoryIfNotExists,
    fromDir,
};
