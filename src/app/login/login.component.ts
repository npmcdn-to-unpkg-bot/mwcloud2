import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@mw/core/core';
import { AuthModel } from '@mw/core/models/auth.model';
import { AppState } from '../app.state';

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css'],
    providers: [],
    directives: [],
})
export class LoginComponent {
    model = new AuthModel("", "", true);
    constructor(
        private _state: AppState, 
        public authService: AuthService, 
        public router: Router
    ) {}

    login() {
        // this.slimLoadingBarService.start(() => {
        //     console.log('Loading complete');
        // });
        let self = this;
        this.authService.login(this.model).subscribe(
            (res) => {
                if (self.authService.is_login_in) {
                    self.get_permission(res);
                }
            },
            (error) => {}
        );
    }

    get_permission(emp_id: string) {
        let self = this;
        this.authService.get_permission(emp_id).subscribe(
            (res) => {
                if (self.authService.is_login_in) {
                    self.router.navigate(['/dashboard/order-list']);
                }
            },
            (error) => {}
        );
    }

    logout() {
        this.authService.logout();
    }
}
