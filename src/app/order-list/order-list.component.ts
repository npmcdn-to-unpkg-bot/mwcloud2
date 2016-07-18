import { Component, OnInit, OnDestroy, trigger, state, style, transition, animate } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { MdButton } from '@angular2-material/button';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { PaginationControlsCmp, PaginatePipe, PaginationService } from 'ng2-pagination';

import { AuthService } from '@mw/core/index';
import { OrderService } from '@mw/core/index';
import { OrderModel } from '@mw/core/index';
import { GenderType } from '@mw/core/index';
import { OrderType, OrderSource, OrderStatus } from '@mw/core/index';
import { PageBaseComponent } from '@mw/core/index';
import { EventBus } from '@mw/core/index';

@Component({
    moduleId: module.id,
    selector: 'order-list',
    templateUrl: 'order-list.component.html',
    styleUrls: ['order-list.component.css'],
    providers: [OrderService, PaginationService],
    directives: [ROUTER_DIRECTIVES, MdButton, MD_CARD_DIRECTIVES, PaginationControlsCmp],
    pipes: [PaginatePipe],
    animations: [
        trigger('sideBarState', [
            state('collapse', style({
                //display: 'none'
                width:"0%",
                maxWidth:"0%"
            })),
            state('show', style({
                //display: 'block'
                width:'20%'
            })),
            transition('collapse => show', animate('200ms')),
            transition('show => collapse', animate('200ms'))
        ])
    ]
})
export class OrderListComponent extends PageBaseComponent implements OnInit {
    private sub: any;
    private GenderTypeEnum = GenderType;
    private OrderTypeEnum = OrderType;
    private OrderSourceEnum = OrderSource;
    private OrderStatusEnum = OrderStatus;
    private orderType: number;
    private sideBarState: string = 'show';
    private orderList: OrderModel[] = [];

    constructor(private orderService: OrderService, private authService: AuthService, private eventBus: EventBus, private route: ActivatedRoute, private toasterService: ToasterService) {
      super();
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.orderType = +params['type']; // (+) converts string 'id' to a number
        });
        this.getPage(this.paginationConfig.currentPage);
        this.eventBus.notifyDataChanged("menu.select", "order-list");
    }
    btnClick() {
        this.eventBus.notifyDataChanged("alert.warn", "button clicked");
    }

    getPage(page: number) {
        this.orderService.getOrderList(this.authService.empInfo.mchId,this.paginationConfig).subscribe(
            (res) => {
                this.paginationConfig.currentPage = page;
                this.paginationConfig.totalItems = res.totalItems;
                this.orderList = res.rows;
            },
            (error) => { this.toasterService.pop("error", "Title", error); }
        );
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
