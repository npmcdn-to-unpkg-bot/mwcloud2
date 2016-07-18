import { Component, OnInit } from '@angular/core';
//import { NgForm } from '@angular/common';

import { BaseComponent } from '@mw/core/index';
import { EventBus } from '@mw/core/index';
import { OrderModel } from '@mw/core/index';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { QuestionService } from '@mw/core/index';

@Component({
    moduleId: module.id,
    selector: 'order',
    templateUrl: 'order.component.html',
    styleUrls: ['order.component.css'],
    directives: [DynamicFormComponent],
    providers: [QuestionService]
})
export class OrderComponent extends BaseComponent implements OnInit {
    questions: any[];
    powers = ['Really Smart', 'Super Flexible',
        'Super Hot', 'Weather Changer'
    ];
    //model = new OrderModel(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');
    submitted = false;

    constructor(private service: QuestionService, private eventBus: EventBus) {
        super();
        this.questions = service.getQuestions();
    }

    ngOnInit() {
        // this.sub = this.route.params.subscribe(params => {
        //     this.orderType = +params['type']; // (+) converts string 'id' to a number
        // });
        this.eventBus.notifyDataChanged("menu.select", "order");
    }

    onSubmit() { this.submitted = true; }
    // Reset the form with a new hero AND restore 'pristine' class state
    // by toggling 'active' flag which causes the form
    // to be removed/re-added in a tick via NgIf
    // TODO: Workaround until NgForm has a reset method (#6822)
    active = true;
    // newHero() {
    //     this.model = new OrderModel(42, '', '');
    //     this.active = false;
    //     setTimeout(() => this.active = true, 0);
    // }
}
