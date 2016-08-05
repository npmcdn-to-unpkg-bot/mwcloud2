// Observable Version
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { HttpService } from './http.service';
import { TableEmployeeModel } from '../models/table-employee.model';
import { AuthService } from '@mw/core/index';


@Injectable()
export class AppointOrderService {
    constructor(private httpService: HttpService, private authService: AuthService) {}

    getAppointOrderTableList(startTime:string, endTime:string, storeId:number) {
        let data :any= {
            employeeId: this.authService.empInfo.empId,
            merchantId: this.authService.empInfo.mchId,
            startTime: startTime,
            endTime: endTime,
            storeId:storeId
        };
        // if(this.authService.empInfo.storeId){
        //     data.storeId = this.authService.empInfo.storeId;
        // }else if(this.authService.permissionStoreList && this.authService.permissionStoreList.length > 0){
        //     data.storeId = this.authService.permissionStoreList[0].id;
        // }

        return this.httpService.request('api/appointment/list', 'post', data)
            .map((res) => {
                let result: TableEmployeeModel[] = [];
                if (res.length > 0) {
                    for (let i in res) {
                        if (res[i]) {
                            result.push(new TableEmployeeModel().serializer(res[i]));
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
