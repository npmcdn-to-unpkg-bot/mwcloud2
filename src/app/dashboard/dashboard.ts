import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'dashboard',
  templateUrl: 'dashboard.html',
  styleUrls: ['dashboard.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class Dashboard { }