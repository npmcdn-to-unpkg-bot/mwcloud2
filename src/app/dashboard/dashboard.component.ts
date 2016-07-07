import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import {MD_LIST_DIRECTIVES} from '@angular2-material/list/list';
import {MdToolbar} from '@angular2-material/toolbar/toolbar';
import {MdButton} from '@angular2-material/button/button';
import {MdIcon} from '@angular2-material/icon/icon';
import {MD_ICON_DIRECTIVES, MdIconRegistry} from '@angular2-material/icon';

@Component({
  moduleId: module.id,
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
  providers: [MdIconRegistry],
  directives: [
  	ROUTER_DIRECTIVES,
  	MdButton,
    MdIcon,
    MD_LIST_DIRECTIVES,
    MdToolbar,
    MD_ICON_DIRECTIVES
  ]
})
export class DashboardComponent { }