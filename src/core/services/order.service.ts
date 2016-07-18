// Observable Version
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { IPaginationInstance } from 'ng2-pagination';

import { HttpService } from './http.service';
import { OrderModel } from '../models/order.model';


@Injectable()
export class OrderService {
    constructor(private httpService: HttpService) {}

    getOrderList(mchId:string,paginationConfig:IPaginationInstance) {
        let data = {page:paginationConfig.currentPage,size:paginationConfig.itemsPerPage};
        return this.httpService.request('/api/order/getList', 'post', data)
            .map((res)=>{
                let result:any = {};
                result.rows = [];
                if(res){
                    result.totalItems = res.total;
                    if(res.rows && res.rows.length > 0){
                        for(let i in res.rows){
                            if(res.rows[i]){
                                result.rows.push(OrderModel.serializer(res.rows[i]));
                            }
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
