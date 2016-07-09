// Observable Version
import { Injectable } from '@angular/core';
import {  Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { AuthModel } from '../models/auth.model';
import { HttpService } from './http.service';


@Injectable()
export class AuthService {
    isLoggedIn: boolean = false;
    constructor(private http_service: HttpService) {}

    login(model:AuthModel) {
        let self = this;
        let data = {
            username:model.user_name,
            password:this.base64encode(model.password),
            rememberMe:model.remember
        };
        return this.http_service.request('/api/auth/form','post',data)
            .map((res:Response)=>{
                debugger;
                self.isLoggedIn = true;
                return res;
            })
            .catch((error:any)=>{
                debugger;
                self.isLoggedIn = false;
                return Observable.throw(error);
            });
        //return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
    }

    logout() {
        this.isLoggedIn = false;
    }

    private base64encode(str: string) {
        let base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        let out:any, i:any, len:any;　　
        let c1:any, c2:any, c3:any;　　
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
