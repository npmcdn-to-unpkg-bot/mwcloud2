import { Component, OnInit } from '@angular/core';
import { Router }      from '@angular/router';

import { AuthService ,HighlightDirective } from '@mw/core/core';
import '@mw/core/rxjs-operators/rxjs-operators';

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.html',
  styleUrls: ['login.css'],
  directives: [HighlightDirective],
})
export class Login {
  message: string;

  constructor(public authService: AuthService, public router: Router) {
    this.setMessage();
  }

  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  login(username:string,password:string) {
    this.message = 'Trying to log in ...';

    this.authService.login().subscribe(() => {
      this.setMessage();
      if (this.authService.isLoggedIn) {
        // Todo: capture where the user was going and nav there.
        // Meanwhile redirect the user to the crisis admin
        this.router.navigate(['/dashboard/order']);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }
}
