import {ApplicationJSON} from "../interfaces/ApplicationJSON";
import {PageNode} from "../interfaces/PageNode";

export const getPages = (json: ApplicationJSON) => {
    let pages:PageNode[] = [];
    if(json && json.application && json.application.pages){
        pages = [...json.application.pages];
    }
    return pages;
}