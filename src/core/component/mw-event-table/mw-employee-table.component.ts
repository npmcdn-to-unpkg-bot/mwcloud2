import {
    Component,
    ChangeDetectionStrategy,
    Input,
    OnChanges,
    Output,
    EventEmitter,
    ChangeDetectorRef
} from '@angular/core';
import { NgFor, NgIf, NgClass, DatePipe } from '@angular/common';

import { DND_DIRECTIVES, DND_PROVIDERS } from 'ng2-dnd/ng2-dnd';
import { getDayView, getDayViewHourGrid, CalendarEvent, DayView, DayViewHour } from 'calendar-utils';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { CalendarDate } from './calendarDate.pipe';
import { CalendarEventTitle } from './calendarEventTitle.pipe';
//import { EmployeeModel } from '@mw/core/index';
import { TableEmployeeModel } from '@mw/core/index';

const SEGMENT_HEIGHT: number = 30;

@Component({
    moduleId: module.id,
    selector: 'mw-employee-table-view',
    styleUrls: ['./scss/mw-employee-table.css'],
    directives: [NgFor, NgIf, NgClass,DND_DIRECTIVES],
    changeDetection: ChangeDetectionStrategy.OnPush,
    pipes: [CalendarDate, CalendarEventTitle],
    providers: [DatePipe,DND_PROVIDERS],
    templateUrl: 'mw-employee-table.component.html'
})
export class MwEmployeeTableView implements OnChanges {

    @Input() date: Date;
    @Input() events: CalendarEvent[] = [];
    @Input() columns: TableEmployeeModel[] = [];
    @Input() hourSegments: number = 2;
    @Input() dayStartHour: number = 0;
    @Input() dayStartMinute: number = 0;
    @Input() dayEndHour: number = 23;
    @Input() dayEndMinute: number = 59;
    @Input() eventWidth: number = 150;
    @Input() refresh: Subject < any > ;
    @Output() eventClicked: EventEmitter < any > = new EventEmitter();
    @Output() hourSegmentClicked: EventEmitter < any > = new EventEmitter();
    private hours: DayViewHour[] = [];
    private view: DayView;
    private width: number = 0;
    private refreshSubscription: Subscription;

    constructor(private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
        if (this.refresh) {
            this.refreshSubscription = this.refresh.subscribe(() => {
                this.refreshAll();
                this.cdr.markForCheck();
            });
        }
    }

    ngOnDestroy(): void {
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    }

    ngOnChanges(changes: any): void {
        if (
            changes.date ||
            changes.dayStartHour ||
            changes.dayStartMinute ||
            changes.dayEndHour ||
            changes.dayEndMinute
        ) {
            this.refreshHourGrid();
        }

        if (
            changes.date ||
            changes.events ||
            changes.dayStartHour ||
            changes.dayStartMinute ||
            changes.dayEndHour ||
            changes.dayEndMinute ||
            changes.eventWidth ||
            changes.columns
        ) {
            this.refreshView();
        }
    }

    onDropSuccess(ev:any,employee:any){
        //debugger;
    }

    private trackByItem(index: number, obj: any): any {
        return obj;
    }

    private refreshHourGrid(): void {
        this.hours = getDayViewHourGrid({
            viewDate: this.date,
            hourSegments: this.hourSegments,
            dayStart: {
                hour: this.dayStartHour,
                minute: this.dayStartMinute
            },
            dayEnd: {
                hour: this.dayEndHour,
                minute: this.dayEndMinute
            }
        });
    }

    private refreshView(): void {
        // if (this.columns && this.columns.length > 0) {
        //     // for(let i in this.columns){
        //     //   if(this.columns[i].)
        //     // }
        //     var _this = this;
        //     this.columns.forEach(function(item, index) {
        //         if (item.appointOrderList) {
        //             item.appointOrderList.forEach(function(orderItem, index) {
        //                   orderItem.top = (orderItem.startTime.getHours()-_this.dayStartHour) * 60 + orderItem.startTime.getMinutes();
        //                   orderItem.height = (orderItem.endTime.getHours() - orderItem.startTime.getHours()) * 60 
        //                       + (orderItem.endTime.getMinutes() - orderItem.startTime.getMinutes());
        //             });
        //         }
        //     });
        // }
        // this.view = getDayView({
        //   events: this.events,
        //   viewDate: this.date,
        //   hourSegments: this.hourSegments,
        //   dayStart: {
        //     hour: this.dayStartHour,
        //     minute: this.dayStartMinute
        //   },
        //   dayEnd: {
        //     hour: this.dayEndHour,
        //     minute: this.dayEndMinute
        //   },
        //   eventWidth: this.eventWidth,
        //   segmentHeight: SEGMENT_HEIGHT
        // });
    }

    private refreshAll(): void {
        this.refreshHourGrid();
        //this.refreshView();
    }

}
