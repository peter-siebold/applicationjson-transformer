import { GenericNode } from "./GenericNode";
export interface ApplicationPageNode extends GenericNode {
    children: GenericNode[];
    layout?: string;
    styles?: ApplicationStyleProperty;
}
export interface ApplicationStyleProperty {
    scoped: boolean;
    rules: ApplicationStyles[];
}
export interface ApplicationStyles {
    selector: string;
    properties: {
        [k: string]: string;
    };
}
/*
                "styles": {
                    "scoped" : true,
                    "rules": [
                        {
                            "selector" : ".admin-page",
                            "properties" : {
                                "padding" : "20px"
                            }
                        },
                        {
                            "selector" : ".new-post",
                            "properties": {
                                "text-align" : "center",
                                "border-bottom" : "2px solid #ccc;",
                                "padding-bottom" : "10px"
                            }
                        }   
                    ]
                },
*/
