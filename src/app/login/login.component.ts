import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@mw/core/core';
import { AuthModel } from '@mw/core/models/auth.model';
import {AppState} from '../app.state';

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css'],
    providers: [],
    directives: [],
})
export class LoginComponent {
    message: string;
    model = new AuthModel("", "", true);
    constructor(private _state:AppState, public authService: AuthService, public router: Router) {
        this.setMessage();
    }

    setMessage() {
        this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
    }

    login() {
        this.message = 'Trying to log in ...';
        let self = this;

        this.authService.login(this.model).subscribe(
            (res) => {
                self.setMessage();
                if (self.authService.isLoggedIn) {
                    // Todo: capture where the user was going and nav there.
                    // Meanwhile redirect the user to the crisis admin
                    self.router.navigate(['/dashboard/order']);
                }
            },
            (error) =>{
                debugger;
                //this._state.notifyDataChanged('alert.warn', "登录失败");
            }
        );
    }

    logout() {
        this.authService.logout();
        this.setMessage();
    }
}
