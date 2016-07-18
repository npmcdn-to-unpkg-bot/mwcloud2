import { Component, OnInit, OnDestroy,trigger,state,style,transition,animate } from '@angular/core';
import { ROUTER_DIRECTIVES,ActivatedRoute }       from '@angular/router';
import {MdButton} from '@angular2-material/button';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import { ToasterService } from 'angular2-toaster/angular2-toaster';

import { AuthService } from '@mw/core/index';
import { OrderService } from '@mw/core/index';
import { OrderModel } from '@mw/core/index';
import { GenderType } from '@mw/core/index';
import { OrderType,OrderSource,OrderStatus } from '@mw/core/index';
import { AppState } from '../app.state';

@Component({
  moduleId: module.id,
  selector: 'order-list',
  templateUrl: 'order-list.component.html',
  styleUrls: ['order-list.component.css'],
  providers: [OrderService],
  directives: [ROUTER_DIRECTIVES,MdButton,MD_CARD_DIRECTIVES],
  animations:[
    trigger('sideBarState', [
      state('collapse', style({
        display:'none'
      })),
      state('show',   style({
        display:'block'
      })),
      //transition('collapse => show', animate('300ms ease-in')),
      //transition('show => collapse', animate('300ms ease-out'))
    ])
  ]
})
export class OrderListComponent implements OnInit {
  private sub: any;
  private GenderTypeEnum = GenderType;
  private OrderTypeEnum = OrderType;
  private OrderSourceEnum = OrderSource;
  private OrderStatusEnum = OrderStatus;
  private order_type:number;
  private side_bar_state:string = 'show';
  private order_list:OrderModel[] = [];
  private list_total_count:number;
  constructor(private order_service:OrderService,private auth_service:AuthService,private app_state: AppState,private route: ActivatedRoute,private toaster_service: ToasterService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.order_type = +params['type']; // (+) converts string 'id' to a number
     });
  	this.order_service.get_order_list(this.auth_service.emp_info.mch_id).subscribe(
            (res) => {
              this.list_total_count = res.total_count;
              this.order_list = res.rows;
            },
            (error) => {this.toaster_service.pop("error", "Title", error);}
        );
  }
  btn_click(){
    this.app_state.notifyDataChanged("alert.warn","button clicked");
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
