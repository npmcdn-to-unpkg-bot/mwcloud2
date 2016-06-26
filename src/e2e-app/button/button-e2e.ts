import {Component} from '@angular/core';
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';

@Component({
  moduleId: module.id,
  selector: 'button-e2e',
  templateUrl: 'button-e2e.html',
  directives: [MD_BUTTON_DIRECTIVES]
})
export class ButtonE2E {
  isDisabled: boolean = false;
  clickCounter: number = 0;
}
