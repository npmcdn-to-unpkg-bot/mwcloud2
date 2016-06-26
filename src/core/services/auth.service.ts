// Observable Version
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { AuthModel } from '../models/auth.model';


@Injectable()
export class AuthService {
    isLoggedIn: boolean = false;
    constructor(private http: Http) {}

    private login_url = '/api/auth/form'; // URL to web API

    // getHeroes(): Observable < Hero[] > {
    //     return this.http.get(this.heroesUrl)
    //         .map(this.extractData)
    //         .catch(this.handleError);
    // }

    login(username:string,password:string) {
        let body = JSON.stringify({ username: username, password: password, rememberMe: false });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        this.isLoggedIn = true;
        return this.http.post(this.login_url, body, options)
            .map(this.extractData)
            .catch(this.handleError);
        //return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
    }

    logout() {
        this.isLoggedIn = false;
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
