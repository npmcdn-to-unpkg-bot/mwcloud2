// Observable Version
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
//import { ToasterService } from 'angular2-toaster/angular2-toaster';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/delay';


@Injectable()
export class HttpService {
    constructor(private http: Http) {

    }

    request(url: string, method: string, data: any) {
        let body:any = null;
        if(data){
            body = JSON.stringify(data);
        }
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, method: method, body: body });
        //let self = this;
        return this.http.request(url, options)
            .map(this.extractData)
            .catch((error: any) => {
                //let errorMessage = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
                // let errorCode = (error.code) ? error.code : error.status ? error.status : "500";
                // switch (errorCode) {
                //     case "120002":
                //         this.toasterService.pop('warning', 'Title', errorMessage);
                //         break;
                //     case "500":
                //     default:
                //         this.toasterService.pop('error', 'Title', errorMessage);
                //         break;
                // }
                return Observable.throw(error);
            });
    }

    private extractData(res: Response) {
        let body = res.json();
        if (body && body.code == "000000") {
            return body.data || {};
        } else {
            if (body && body.message) {
                throw { status: body.code, message: body.message };
            } else {
                throw { status: "500", message: "未知错误" };
            }
        }
    }

    // private handleError(error: any) {
    //     // In a real world app, we might use a remote logging infrastructure
    //     // We'd also dig deeper into the error to get a better message
    //     let errMsg = (error.message) ? error.message :
    //         error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    //     console.error(errMsg); // log to console instead
    //     this.toasterService.pop('error', 'Title', errMsg);
    //     return Observable.throw(errMsg);
    // }
}
