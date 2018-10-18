const promptToBuild = () => {
    console.log("could not find application entry point, please build app using npm run build");
};

try {
    const menu = require("./lib/main").menu;
    const dirName = __dirname;
    const appEnvironment = {
        env: process.env,
        dirname: dirName,
    };
    if (menu) {
        menu(appEnvironment);
    } else {
        promptToBuild();
    }
} catch (error) {
    promptToBuild();
    process.exit(-1);
}
