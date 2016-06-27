import { Component, Input, OnInit }  from '@angular/core';
import { FormGroup, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

import { DynamicFormQuestionComponent } from '../dynamic-form-question/dynamic-form-question.component';
import { QuestionBase }                 from '@mw/core/models/question-base';
import { QuestionControlService }       from '@mw/core/services/question-control.service';
@Component({
  moduleId: module.id,
  selector: 'dynamic-form',
  templateUrl: 'dynamic-form.component.html',
  directives: [DynamicFormQuestionComponent, REACTIVE_FORM_DIRECTIVES],
  providers:  [QuestionControlService]
})
export class DynamicFormComponent implements OnInit {
  @Input() questions: QuestionBase<any>[] = [];
  form: FormGroup;
  payLoad = '';
  constructor(private qcs: QuestionControlService) {  }
  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
  }
  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }
}
