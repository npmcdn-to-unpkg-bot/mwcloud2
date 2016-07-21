// Observable Version
import { Injectable } from '@angular/core';
//import {  Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/merge';
//import 'rxjs/add/operator/take';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/switchMap';
import { AuthModel } from '../models/auth.model';
import { HttpService } from './http.service';
import { LocalStorage,WEB_STORAGE_PROVIDERS } from "h5webstorage";


@Injectable()
export class AuthService {
    isLogin: boolean = false;
    empInfo: any;
    permissionCodeList: any[] = [];
    permissionStoreList: any[] = [];
    //constructor(private httpService: HttpService, private window: Window) {}
    constructor(private httpService: HttpService,private localStorage:LocalStorage) {}

    public login(model: AuthModel) {
        let data = {
            username: model.userName,
            password: this.base64encode(model.password),
            rememberMe: model.remember
        };
        return this.httpService.request('/api/auth/form', 'post', data)
            // .map((res)=>{
            //     debugger;
            //     self.get_employee_list(res,self);
            // })
            .switchMap((res) => this.getEmployeeList(res))
            .catch((error: any) => {
                this.isLogin = false;
                return Observable.throw(error);
            });
        //return Observable.of(true).delay(1000).do(val => this.isLogin = true);
    }

    public logout() {
        this.isLogin = false;
    }

    public getPermission(empId: string) {
        // var timer1 = Observable.interval(1000).take(10);
        // var timer2 = Observable.interval(2000).take(6);
        // var timer3 = Observable.interval(500).take(10);
        // var concurrent = 2; // the argument
        // //var merged = Observable.merge(timer1, timer2, timer3, concurrent);
        // var merged = Observable.merge(timer1,timer3,1);
        // merged.subscribe(x => console.log(x));
        return Observable.merge(this.getPermissionStoreList(empId), this.getPermissions(empId))
            .reduce((res1: any[], res2: any[]) => {
                this.permissionStoreList = res1;
                this.permissionCodeList = res2;
                return null;
            })
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    private getPermissions(empId: string) {
        return this.httpService.request('/api/employee/permissions/' + empId, 'get', null)
            .map((res) => {
                this.isLogin = true;
                return res;
            })
            .catch((error: any) => {
                this.isLogin = false;
                return Observable.throw(error);
            });
    }

    private getEmployeeList(userId: string) {
        return this.httpService.request('/api/employee/list/account/' + userId, 'get', null)
            .switchMap((res) => this.employeeLogin(res))
            .catch((error: any) => {
                this.isLogin = false;
                return Observable.throw(error);
            });
    }

    private employeeLogin(empList: any) {
        let empId: number = null;
        if (empList && empList.length > 0) {
            empId = empList[0].id;
            this.empInfo = empList[0];
            this.empInfo = {
                empId: empList[0].id,
                emp_name: empList[0].name
            };
            if (empList[0].merchant) {
                this.empInfo.mchId = empList[0].merchant.id;
                this.empInfo.mchName = empList[0].merchant.name;
            }
            if (empList[0].store) {
                this.empInfo.storeId = empList[0].store.id;
                this.empInfo.storeName = empList[0].store.name;
            }
            this.localStorage.setItem('emp_info', JSON.stringify(this.empInfo));
        } else {
            return Observable.throw("获取员工身份失败");
        }

        return this.httpService.request('/api/employee/login/' + empId, 'put', null)
            .map((res) => {
                this.isLogin = true;
                return res;
            })
            .catch((error: any) => {
                this.isLogin = false;
                return Observable.throw(error);
            });
    }

    private getPermissionStoreList(empId: string) {
        return this.httpService.request('/api/employee/permissionStores/' + empId, 'get', null)
            .map((res) => {
                return res;
            })
            .catch((error: any) => {
                this.isLogin = false;
                return Observable.throw(error);
            });
    }

    private base64encode(str: string) {
        let base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        let out: any, i: any, len: any;　　
        let c1: any, c2: any, c3: any;　　
        len = str.length;　　
        i = 0;　　
        out = "";　　
        while (i < len) {
            c1 = str.charCodeAt(i++) & 0xff;
            if (i == len) {　　
                out += base64EncodeChars.charAt(c1 >> 2);　　
                out += base64EncodeChars.charAt((c1 & 0x3) << 4);　　
                out += "==";　　
                break;
            }
            c2 = str.charCodeAt(i++);
            if (i == len) {　　
                out += base64EncodeChars.charAt(c1 >> 2);　　
                out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));　　
                out += base64EncodeChars.charAt((c2 & 0xF) << 2);　　
                out += "=";　　
                break;
            }
            c3 = str.charCodeAt(i++);
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
            out += base64EncodeChars.charAt(c3 & 0x3F);　　
        }　　
        return out;
    }
}
