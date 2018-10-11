const promptToBuild = () => {
    console.log("could not find application entry point, please build app using npm run build")
}

try {
    const menu = require("./lib/main").menu;
    if(menu){
        menu();
    } else {
        promptToBuild();
    }
} catch (error) {
    promptToBuild();
    process.exit(-1);
}