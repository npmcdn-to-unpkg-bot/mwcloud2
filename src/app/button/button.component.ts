import {Component} from '@angular/core';
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';

@Component({
  moduleId: module.id,
  selector: 'button',
  templateUrl: 'button.component.html',
  styleUrls: ['button.component.css'],
  directives: [MD_BUTTON_DIRECTIVES]
})
export class ButtonComponent {
  isDisabled: boolean = false;
  clickCounter: number = 0;
}
