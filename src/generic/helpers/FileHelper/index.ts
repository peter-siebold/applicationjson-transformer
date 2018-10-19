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
export const createDirectoryIfNotExistsRecursive = async (dir: string) => {
    try {
        const directories = dir.split(path.sep);
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
const mkDirByPathSync = (targetDir: string, { isRelativeToScript = false } = {}) => {
    const sep = path.sep;
    const initDir = path.isAbsolute(targetDir) ? sep : "";
    const baseDir = isRelativeToScript ? __dirname : ".";

    return targetDir.split(sep).reduce((parentDir, childDir) => {
        const curDir = path.resolve(baseDir, parentDir, childDir);
        try {
            fs.mkdirSync(curDir);
        } catch (err) {
            if (err.code === "EEXIST") {
                // curDir already exists!
                return curDir;
            }

            // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
            if (err.code === "ENOENT") {
                // Throw the original parentDir error on curDir `ENOENT` failure.
                throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
            }

            const caughtErr = ["EACCES", "EPERM", "EISDIR"].indexOf(err.code) > -1;
            if (!caughtErr || (caughtErr && curDir === path.resolve(targetDir))) {
                throw err; // Throw if it's just the last created dir.
            }
        }

        return curDir;
    }, initDir);
};
export default {
    buildPath,
    createDirectoryIfNotExists,
    createDirectoryIfNotExistsRecursive,
    fromDir,
    mkDirByPathSync,
};
