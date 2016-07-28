import {IMyDayLabels} from "./mw-day-labels.interface";
import {IMyMonthLabels} from "./mw-month-labels.interface";
import {IMyDate} from "./mw-date.interface";

export interface IMyOptions {
    dayLabels?: IMyDayLabels;
    monthLabels?: IMyMonthLabels;
    dateFormat?: string;
    todayBtnTxt?: string;
    firstDayOfWeek?: string;
    sunHighlight?: boolean;
    disabledUntil?: IMyDate;
    disabledSince?: IMyDate;
    disableWeekends?: boolean;
    height?: string;
    width?: string;
    inline?: boolean;
}