import {IMyDate} from "./mw-date.interface";

export interface IMyWeek {
    dateObj: IMyDate;
    cmo: number;
    currDay: boolean;
    dayNbr: number;
    disabled: boolean;
}