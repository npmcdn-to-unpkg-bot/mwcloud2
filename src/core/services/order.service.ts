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
                let result:any = {};
                result.rows = [];
                if(res){
                    result.total_count = res.total;
                    if(res.rows && res.rows.length > 0){
                        for(let i in res.rows){
                            result.rows.push(
                                new OrderModel(
                                    res.rows[i].id,
                                    res.rows[i].orderNo,
                                    res.rows[i].payDate,
                                    res.rows[i].memberId,
                                    res.rows[i].memberNo,
                                    res.rows[i].memberName,
                                    res.rows[i].memberMobile
                                )
                            );
                        }
                    }
                }
                return result;
            })
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }
}
