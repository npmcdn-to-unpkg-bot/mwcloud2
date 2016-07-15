import { Component, OnInit } from '@angular/core';
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';

import { AuthService } from '@mw/core/services/auth.service';
import { OrderService } from '@mw/core/services/order.service';
import { AppState } from '../app.state';

@Component({
  moduleId: module.id,
  selector: 'order-list',
  templateUrl: 'order-list.component.html',
  styleUrls: ['order-list.component.css'],
  providers: [OrderService],
  directives: [MD_BUTTON_DIRECTIVES]
})
export class OrderListComponent implements OnInit {

  constructor(private order_service:OrderService,private auth_service:AuthService,private _state: AppState) {}

  ngOnInit() {
  	this.order_service.get_order_list(this.auth_service.emp_info.mch_id).subscribe(
            (res) => {
            },
            (error) => {}
        );
  }
  btn_click(){
    this._state.notifyDataChanged("alert.warn","button clicked");
  }

}
