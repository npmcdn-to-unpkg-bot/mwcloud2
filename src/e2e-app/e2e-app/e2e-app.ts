import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';
import {ButtonE2E} from '../button/button-e2e';


@Component({
  moduleId: module.id,
  selector: 'e2e-app',
  providers: [],
  templateUrl: 'e2e-app.html',
  directives: [
    ROUTER_DIRECTIVES,
    MD_BUTTON_DIRECTIVES,
  ],
  pipes: []
})
export class E2EApp { }
