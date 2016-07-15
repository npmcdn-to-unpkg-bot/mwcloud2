import { Component, OnInit } from '@angular/core';

import { AuthService } from '@mw/core/services/auth.service';
import { OrderService } from '@mw/core/services/order.service';

@Component({
  moduleId: module.id,
  selector: 'order-list',
  templateUrl: 'order-list.component.html',
  styleUrls: ['order-list.component.css'],
  providers: [OrderService]
})
export class OrderListComponent implements OnInit {

  constructor(private order_service:OrderService,private auth_service:AuthService) {}

  ngOnInit() {
  	this.order_service.get_order_list(this.auth_service.emp_info.mch_id).subscribe(
            (res) => {
            },
            (error) => {}
        );
  }

}
