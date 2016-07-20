// Observable Version
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { IPaginationInstance } from 'ng2-pagination';

import { HttpService } from './http.service';
import { OrderModel } from '../models/order.model';
import { OrderStatus } from '../enums/order.enum';


@Injectable()
export class OrderService {
    constructor(private httpService: HttpService) {}

    getOrderList(mchId: number, storeId: number, orderStatus: OrderStatus, page: number, size: number) {
        let status: number;
        switch (orderStatus) {
            case OrderStatus.UNPAID:
                status = 1;
                break;
            case OrderStatus.PAID:
                status = 2;
                break;
            case OrderStatus.PAID_LEFT:
                status = 3;
                break;
            case OrderStatus.HISTORY:
                status = 4;
                break;
        }
        let data = {
            page: page,
            size: size,
            query: [
                { field: "merchantId", value: mchId },
                { field: "storeId", value: storeId },
                { field: "status", value: status }
            ],
            sort: [
                { field: "lastUpdateDate", sort: "desc" },
            ]
        };
        return this.httpService.request('/api/order/getList', 'post', data)
            .map((res) => {
                let result: any = {};
                result.rows = [];
                if (res) {
                    result.totalItems = res.total;
                    if (res.rows && res.rows.length > 0) {
                        for (let i in res.rows) {
                            if (res.rows[i]) {
                                result.rows.push(new OrderModel().serializer(res.rows[i]));
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
