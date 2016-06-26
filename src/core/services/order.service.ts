// Observable Version
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { OrderModel } from '../models/order.model';


@Injectable()
export class OrderService {
    constructor(private http: Http) {}

    private heroesUrl = '/api/auth/form'; // URL to web API
}
