import { PageNode } from "./PageNode";
export interface ApplicationNode {
    creationVersion: string;
    lang: string;
    guid: string;
    startpage: string;
    name: string;
    description: string;
    title: string;
    appMenu: string;
    pages: PageNode[];
}
