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
import { ToasterService } from 'angular2-toaster/angular2-toaster';


@Injectable()
export class AuthService {
    is_login_in: boolean = true;
    emp_info:any;
    permission_code_list:any[] = [];
    permission_store_list:any[] = [];
    constructor(private http_service: HttpService,private toasterService: ToasterService,private window: Window) {}

    login(model: AuthModel) {
        let self = this;
        let data = {
            username: model.user_name,
            password: this.base64encode(model.password),
            rememberMe: model.remember
        };
        return this.http_service.request('/api/auth/form', 'post', data)
            // .map((res)=>{
            //     debugger;
            //     self.get_employee_list(res,self);
            // })
            .switchMap((res) => self.get_employee_list(res, self))
            .catch((error: any) => {
                self.is_login_in = false;
                return Observable.throw(error);
            });
        //return Observable.of(true).delay(1000).do(val => this.is_login_in = true);
    }

    get_employee_list(user_id: string, self: AuthService) {
        return this.http_service.request('/api/employee/list/account/' + user_id, 'get', null)
            .switchMap((res) => self.employee_login(res, self))
            .catch((error: any) => {
                self.is_login_in = false;
                return Observable.throw(error);
            });
    }

    employee_login(emp_list: any, self: AuthService) {
        let emp_id:number = null;
        if(emp_list && emp_list.length > 0){
            emp_id = emp_list[0].id;
            self.emp_info = emp_list[0];
            self.emp_info = {
                mch_id:emp_list[0].merchant.id,
                mch_name:emp_list[0].merchant.name,
                store_id:emp_list[0].store.id,
                store_name:emp_list[0].store.name,
                emp_id:emp_list[0].id,
                emp_name:emp_list[0].name
            };
            this.window.localStorage.setItem('emp_info',JSON.stringify(self.emp_info));
        }else{
            this.toasterService.pop("error","Title","获取员工身份失败");
            return;
        }
        
        return this.http_service.request('/api/employee/login/' + emp_id, 'put', null)
            .map((res) => {
                self.is_login_in = true;
                return res;
            })
            .catch((error: any) => {
                self.is_login_in = false;
                return Observable.throw(error);
            });
    }

    get_permissions(emp_id: string) {
        var self = this;
        return this.http_service.request('/api/employee/permissions/' + emp_id, 'get', null)
            .map((res) => {
                self.is_login_in = true;
                return res;
            })
            .catch((error: any) => {
                self.is_login_in = false;
                return Observable.throw(error);
            });
    }

    get_permission_store_list(emp_id: string) {
        var self = this;
        return this.http_service.request('/api/employee/permissionStores/' + emp_id, 'get', null)
            .map((res) => {
                return res;
            })
            .catch((error: any) => {
                self.is_login_in = false;
                return Observable.throw(error);
            });
    }

    get_permission(emp_id: string) {
        // var timer1 = Observable.interval(1000).take(10);
        // var timer2 = Observable.interval(2000).take(6);
        // var timer3 = Observable.interval(500).take(10);
        // var concurrent = 2; // the argument
        // //var merged = Observable.merge(timer1, timer2, timer3, concurrent);
        // var merged = Observable.merge(timer1,timer3,1);
        // merged.subscribe(x => console.log(x));
        var self = this;
        return Observable.merge(this.get_permission_store_list(emp_id), this.get_permissions(emp_id))
            .reduce((res1:any[],res2:any[])=>{
                self.permission_store_list = res1;
                self.permission_code_list = res2;
                return null;
            })
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    logout() {
        this.is_login_in = false;
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
