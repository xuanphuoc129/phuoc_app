import { Paramskey } from "../../smartfox/Paramkeys";

export interface SfsArrayExtension {
    content: any;
    array: any;
}

export interface SfsInfoExtension{
    content: any;
    info: any;
}

export class SfsClientBaseExtension {
    constructor() {

    }

    public doCheckStatusParams(params): boolean {
        if (params.getInt(Paramskey.STATUS) == 1) {
            return true;
        } else {
            return false;
        }
    }

    public doParseArrayExtensions(params): SfsArrayExtension {
        let content = params.getSFSObject(Paramskey.CONTENT);
        let array = content.getSFSArray(Paramskey.ARRAY);
        return {
            content : content,
            array: array
        };
    }

    public doParseInfo(params): SfsInfoExtension{
       
        let content = params.getSFSObject(Paramskey.CONTENT);
        if (content) {
            if (content.containsKey(Paramskey.INFO)) {
                return { content: content, info: content.getSFSObject(Paramskey.INFO) };
            } else {
                return { content: content, info: null };
            }
        } else {
            return null;
        }
    }

}