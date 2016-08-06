import { Component, OnInit, OnDestroy } from '@angular/core';
import { FORM_DIRECTIVES, NgModel, DatePipe } from '@angular/common';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar/ng2-slim-loading-bar';
import { SELECT_DIRECTIVES } from 'ng2-select/ng2-select';
import { NKDatetime } from 'ng2-datetime/ng2-datetime';

import { SweetAlertService } from '@mw/core/index';
import * as moment from 'moment';
import { UnitOfTime, Moment } from 'moment';
import {
    MwEmployeeTableView,
    CalendarEvent,
    CalendarTitle,
    CalendarEventAction,
    CalendarConfig,
    CalendarDate
} from '@mw/core/component/mw-event-table/index';
import { EventBus } from '@mw/core/index';
import { MwMoney } from '@mw/core/index';
import { MwTimerPicker } from '@mw/core/component/mw-timer-picker/index';
import { MdButton } from '@angular2-material/button';
import { MwCollapseDirective } from '@mw/core/index';
import { TableEmployeeModel } from '@mw/core/index';
import { AppointOrderService } from '@mw/core/index';
import { AuthService } from '@mw/core/index';

@Component({
    moduleId: module.id,
    selector: 'booking-table',
    templateUrl: 'booking-table.component.html',
    styleUrls: ['booking-table.component.css'],
    directives: [MdButton, MwTimerPicker, MwCollapseDirective, MwEmployeeTableView,SELECT_DIRECTIVES,NKDatetime],
    pipes: [CalendarTitle],
    providers: [CalendarConfig, DatePipe, CalendarDate, AppointOrderService]
})
export class BookingTableComponent implements OnInit, OnDestroy {
    sideBarCollapse: boolean = false;
    tableEmployeeList: TableEmployeeModel[] = [];

    // selectedDate1: string = '';
    // private myDatePickerOptions1 = {
    //     todayBtnTxt: 'Today',
    //     dateFormat: 'yyyy-mm-dd',
    //     firstDayOfWeek: 'mo',
    //     sunHighlight: true,
    //     height: '34px',
    //     width: '260px',
    //     disableUntil: { year: 0, month: 0, day: 0 },
    //     //disableSince: {year: 2016, month: 6, day: 26},
    //     //disableWeekends: true
    // };

    // private myDatePickerOptions2 = {
    //     todayBtnTxt: 'Today',
    //     dateFormat: 'yyyy-mm-dd',
    //     firstDayOfWeek: 'mo',
    //     sunHighlight: true,
    //     height: '34px',
    //     width: '260px',
    //     inline: true
    // };
    // selectedDate2: string = '2016-07-21';

    private sub: any;
    private slideBoxIsOpen: boolean = false;
    private view: UnitOfTime = 'day';
    private date: Date = new Date();

    public items:Array<string> = ['Amsterdam', 'Antwerp', 'Athens', 'Barcelona',
    'Berlin', 'Birmingham', 'Bradford', 'Bremen', 'Brussels', 'Bucharest',
    'Budapest', 'Cologne', 'Copenhagen', 'Dortmund', 'Dresden', 'Dublin',
    'Düsseldorf', 'Essen', 'Frankfurt', 'Genoa', 'Glasgow', 'Gothenburg',
    'Hamburg', 'Hannover', 'Helsinki', 'Kraków', 'Leeds', 'Leipzig', 'Lisbon',
    'London', 'Madrid', 'Manchester', 'Marseille', 'Milan', 'Munich', 'Málaga',
    'Naples', 'Palermo', 'Paris', 'Poznań', 'Prague', 'Riga', 'Rome',
    'Rotterdam', 'Seville', 'Sheffield', 'Sofia', 'Stockholm', 'Stuttgart',
    'The Hague', 'Turin', 'Valencia', 'Vienna', 'Vilnius', 'Warsaw', 'Wrocław',
    'Zagreb', 'Zaragoza', 'Łódź'];

    public selected(value:any):void {
    console.log('Selected value is: ', value);
  }

  public removed(value:any):void {
    console.log('Removed value is: ', value);
  }

  public typed(value:any):void {
    console.log('New search input: ', value);
  }

  public refreshValue(value:any):void {
    //this.value = value;
  }

    constructor(
        private eventBus: EventBus,
        private appointOrderService: AppointOrderService,
        private route: ActivatedRoute,
        private slimLoader: SlimLoadingBarService,
        private authService: AuthService,
        private sweetAlert: SweetAlertService
    ) {
        // let date = new Date();
        // let money = new MwMoney(123);
        // this.selectedDate1 = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '.' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '.' + date.getFullYear();
        // //this.selectedDate1 = date.toString("YYYY-MM-DD");
        // // Disable dates from 5th backward
        // date.setDate(date.getDate() - 5);
        // this.myDatePickerOptions1.disableUntil = { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() }

        // for (let i = 0; i < 16; i++) {
        //     this.tableEmployeeList.push(new EmployeeModel(i + 1, "技师" + (i + 1) + "号"));
        // }
        
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            //this.orderType = +params['type']; // (+) converts string 'id' to a number
            this.tableEmployeeList = [];
            this.authService.getStoreList()
                .subscribe(
                    (res) => {
                        let storeId:number;
                        if(res && res.length > 0){
                            storeId = res[0].id;
                        }else{
                            storeId = 1240323626310282;
                        }
                        this.getAppointOrder(storeId);
                        this.slimLoader.complete();
                    },
                    (error) => {
                        this.eventBus.notifyDataChanged("alert.message", error);
                        this.slimLoader.complete();
                    }
                );
            
        });
        this.eventBus.notifyDataChanged("menu.select", "booking-table");
    }

    onDateChanged1(event: any) {
        console.log('onDateChanged1(): ', event.date, ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onDateChanged2(event: any) {
        console.log('onDateChanged2(): ', event.date, ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
    }

    btnClick() {
        this.sideBarCollapse = !this.sideBarCollapse;
        this.sweetAlert.alert('cc');
    }

    increment(): void {
        this.date = moment(this.date).add(1, this.view).toDate();
        this.getAppointOrder(1240323626310282);
    }

    decrement(): void {
        this.date = moment(this.date).subtract(1, this.view).toDate();
        this.getAppointOrder(1240323626310282);
    }

    today(): void {
        this.date = new Date();
    }

    dayClicked({ date, events }: { date: Moment, events: CalendarEvent[] }): void {
        if (moment(date).startOf('month').isSame(moment(this.date).startOf('month'))) {
            if ((this.date.getTime() === date.toDate().getTime() && this.slideBoxIsOpen === true) || events.length === 0) {
                this.slideBoxIsOpen = false;
            } else {
                this.slideBoxIsOpen = true;
                this.date = date.toDate();
            }
        }
    }

    private getAppointOrder(storeId:number) {
        this.slimLoader.start();
        var startTime = moment(this.date).format("YYYY-MM-DD")+" 00:00:00";
        var endTime = moment(this.date).add(1,'days').format("YYYY-MM-DD")+" 00:00:00";
        this.appointOrderService.getAppointOrderTableList(startTime, endTime,storeId)
            .subscribe(
                (res) => {
                    this.tableEmployeeList = res;
                    this.slimLoader.complete();
                },
                (error) => {
                    this.eventBus.notifyDataChanged("alert.message", error);
                    this.slimLoader.complete();
                }
            );
    }

}


// private actions: CalendarEventAction[] = [{
//         label: '<i class="fa fa-fw fa-pencil"></i>',
//         onClick: ({ event }: { event: CalendarEvent }): void => {
//             console.log('Edit event', event);
//         }
//     }, {
//         label: '<i class="fa fa-fw fa-times"></i>',
//         onClick: ({ event }: { event: CalendarEvent }): void => {
//             this.events = this.events.filter(iEvent => iEvent !== event);
//         }
//     }];

//     private events: CalendarEvent[] = [{
//         start: moment().startOf('week').add(4, 'days').toDate(),
//         end: moment().startOf('week').add(5, 'days').toDate(),
//         title: 'A final event',
//         color: {
//             primary: '#ad2121',
//             secondary: '#FAE3E3'
//         },
//         actions: this.actions
//     }, {
//         start: moment().startOf('week').add(1, 'minutes').add(4, 'days').toDate(),
//         end: moment().startOf('week').add(5, 'days').toDate(),
//         title: 'A final event',
//         color: {
//             primary: '#ad2121',
//             secondary: '#FAE3E3'
//         },
//         actions: this.actions
//     }, {
//         start: moment().startOf('week').add(2, 'minutes').add(4, 'days').toDate(),
//         end: moment().startOf('week').add(5, 'days').toDate(),
//         title: 'A final event',
//         color: {
//             primary: '#ad2121',
//             secondary: '#FAE3E3'
//         },
//         actions: this.actions
//     }, {
//         start: moment().startOf('week').add(6, 'days').toDate(),
//         end: moment().endOf('week').toDate(),
//         title: 'I should be last',
//         color: {
//             primary: '#ad2121',
//             secondary: '#FAE3E3'
//         },
//         actions: this.actions
//     }, {
//         start: moment().startOf('week').add(1, 'minutes').add(6, 'days').toDate(),
//         end: moment().endOf('week').toDate(),
//         title: 'I should be last',
//         color: {
//             primary: '#ad2121',
//             secondary: '#FAE3E3'
//         },
//         actions: this.actions
//     }, {
//         start: moment().startOf('week').add(2, 'minutes').add(6, 'days').toDate(),
//         end: moment().endOf('week').toDate(),
//         title: 'I should be last',
//         color: {
//             primary: '#ad2121',
//             secondary: '#FAE3E3'
//         },
//         actions: this.actions
//     }, {
//         start: moment().startOf('week').add(3, 'minutes').add(6, 'days').toDate(),
//         end: moment().endOf('week').toDate(),
//         title: 'I should be last',
//         color: {
//             primary: '#ad2121',
//             secondary: '#FAE3E3'
//         },
//         actions: this.actions
//     }, {
//         start: moment().startOf('week').toDate(),
//         end: moment().startOf('week').add(5, 'days').toDate(),
//         title: 'Another event',
//         color: {
//             primary: '#e3bc08',
//             secondary: '#FDF1BA'
//         },
//         actions: this.actions
//     }, {
//         start: moment().startOf('week').add(1, 'minutes').toDate(),
//         end: moment().startOf('week').add(5, 'days').toDate(),
//         title: 'Another event',
//         color: {
//             primary: '#e3bc08',
//             secondary: '#FDF1BA'
//         }
//     }, {
//         start: moment().startOf('week').subtract(3, 'days').toDate(),
//         end: moment().endOf('week').add(3, 'days').toDate(),
//         title: 'My event',
//         color: {
//             primary: '#1e90ff',
//             secondary: '#D1E8FF'
//         },
//         actions: this.actions
//     }, {
//         start: moment().startOf('week').add(1, 'days').toDate(),
//         end: moment().startOf('week').add(3, 'days').toDate(),
//         title: '3 day event',
//         color: {
//             primary: '#1e90ff',
//             secondary: '#D1E8FF'
//         },
//         actions: this.actions
//     }, {
//         start: moment().startOf('week').add(1, 'days').toDate(),
//         end: moment().startOf('week').add(2, 'days').toDate(),
//         title: '2 day event',
//         color: {
//             primary: '#1e90ff',
//             secondary: '#D1E8FF'
//         },
//         actions: this.actions
//     }];


// for (let i: number = 0; i < 7; i++) {
//     for (let j: number = 0; j < 5; j++) {
//         this.events.push({
//             start: moment().startOf('week').add(j, 'minutes').add(i, 'days').toDate(),
//             title: `Event column ${i} count ${j}`,
//             color: {
//                 primary: '#1e90ff',
//                 secondary: '#D1E8FF'
//             }
//         });
//     }
// }
