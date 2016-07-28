//import './scss/angular2-calendar.scss';
import {CalendarMonthView} from './calendarMonthView.component';
import {CalendarWeekView} from './calendarWeekView.component';
import {CalendarDayView} from './calendarDayView.component';
import {MwEmployeeTableView} from './mw-employee-table.component';
import {CalendarTitle} from './calendarTitle.pipe';
import {CalendarDate} from './calendarDate.pipe';
import {CalendarConfig} from './calendarConfig.provider';

export * from './calendarMonthView.component';
export * from './calendarWeekView.component';
export * from './calendarDayView.component';
export * from './mw-employee-table.component';
export * from './calendarTitle.pipe';
export * from './calendarDate.pipe';
export * from './calendarConfig.provider';
export {CalendarEvent, EventAction as CalendarEventAction} from 'calendar-utils';

// for angular-cli
export default {
  directives: [CalendarMonthView, CalendarWeekView, CalendarDayView,MwEmployeeTableView],
  pipes: [CalendarTitle, CalendarDate],
  providers: [CalendarConfig]
};