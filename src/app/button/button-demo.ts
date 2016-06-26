import {Component} from '@angular/core';
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';

@Component({
  moduleId: module.id,
  selector: 'button-demo',
  templateUrl: 'button-demo.html',
  styleUrls: ['button-demo.css'],
  directives: [MD_BUTTON_DIRECTIVES]
})
export class ButtonDemo {
  isDisabled: boolean = false;
  clickCounter: number = 0;
}
