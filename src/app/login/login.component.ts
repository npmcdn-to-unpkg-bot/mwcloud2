import { Component, OnInit } from '@angular/core';
import { Router }      from '@angular/router';

import { AuthService ,HighlightDirective } from '@mw/core/core';
import '@mw/core/rxjs-operators/rxjs-operators';

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  directives: [HighlightDirective],
})
export class LoginComponent {
  message: string;

  constructor(public authService: AuthService, public router: Router) {
    this.setMessage();
  }

  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  login(username:string,password:string) {
    this.message = 'Trying to log in ...';
    let self = this;

    this.authService.login(username,password).subscribe(() => {
      self.setMessage();
      if (self.authService.isLoggedIn) {
        // Todo: capture where the user was going and nav there.
        // Meanwhile redirect the user to the crisis admin
        self.router.navigate(['/dashboard/order']);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }
}
