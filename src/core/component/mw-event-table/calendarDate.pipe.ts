import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';
import * as moment from 'moment';
import {Moment} from 'moment';
import {CalendarConfig} from './calendarConfig.provider';

@Pipe({
  name: 'calendarDate'
})
export class CalendarDate implements PipeTransform {

  constructor(private config: CalendarConfig, private datePipe: DatePipe) {}

  transform(date: Date | Moment, view: string, format: string): string {
    //debugger;
    const formats: any = this.config.dateFormats[view][format];
    //const formats: any = "Ha";
    date = moment(date).toDate();

    if (this.config.dateFormatter === 'moment') {
      return moment(date).format(formats.moment);
    } else {
      return this.datePipe
        //.transform(date, formats.angular)
        .transform(date, 'HH:mm')
        .replace(' W ', ` ${moment(date).isoWeek()} `); //TODO - find a way of making this less hacky
    }

  }

}