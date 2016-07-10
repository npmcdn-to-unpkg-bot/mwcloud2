// Observable Version
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { HttpService } from './http.service';
import { OrderModel } from '../models/order.model';


@Injectable()
export class OrderService {
    constructor(private http_service: HttpService) {}

    get_order_list(mch_id:string) {
        let data = {page:0,size:10};
        return this.http_service.request('/api/order/getList', 'post', data)
            .map((res)=>{
                return res;
            })
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }
}
