import { Component, OnInit } from '@angular/core';

import { MwThemeSpinner } from '@mw/core/index';

@Component({
    moduleId: module.id,
    selector: 'register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css'],
    providers: [MwThemeSpinner]
})
export class RegisterComponent implements OnInit {
    constructor(private spinner: MwThemeSpinner) {
    }
    ngOnInit() {}

    ngAfterViewInit(): void {
        this.spinner.hide();
    }
}
