import {IMyOptions} from "./mw-options.interface";

export interface IMyLocales {
    [lang: string]: IMyOptions;
}