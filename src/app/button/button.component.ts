import {Component} from '@angular/core';
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';
import {MD_ICON_DIRECTIVES, MdIconRegistry} from '@angular2-material/icon';

@Component({
  moduleId: module.id,
  selector: 'button',
  templateUrl: 'button.component.html',
  styleUrls: ['button.component.css'],
  providers: [MdIconRegistry],
  directives: [MD_BUTTON_DIRECTIVES,MD_ICON_DIRECTIVES]
})
export class ButtonComponent {
  isDisabled: boolean = false;
  clickCounter: number = 0;
}
