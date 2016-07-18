import { provideRouter, RouterConfig, CanDeactivate } from '@angular/router';
import { Observable }    from 'rxjs/Observable';

import { AuthGuard } from '@mw/core/index';
import { AuthService } from '@mw/core/index';

import { LoginComponent } from '../login/login.component';
import { ButtonComponent } from '../button/button.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { OrderComponent } from '../order/order.component';
import { OrderListComponent } from '../order-list/order-list.component';
import { RegisterComponent } from '../register/register.component';
import { IndexComponent } from '../index/index.component';


export interface CanComponentDeactivate {
 canDeactivate: () => boolean | Observable<boolean>;
}

export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate): Observable<boolean> | boolean {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}

export const routes: RouterConfig = [
    { path: '', redirectTo: '/login', terminal: true },
    { path: 'dashboard', redirectTo: '/dashboard/index', terminal: true },
    { path: 'login', component: LoginComponent },
    { path: 'button', component: ButtonComponent }, {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            { path: 'index', component: IndexComponent },
            { path: 'button', component: ButtonComponent },
            { path: 'order', component: OrderComponent, canActivate: [AuthGuard] },
            { path: 'order-list/:type', component: OrderListComponent, canActivate: [AuthGuard] },
            { path: 'register', component: RegisterComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];

export const MW_APP_ROUTER_PROVIDERS = [
    provideRouter(routes), [AuthGuard, AuthService],
    CanDeactivateGuard
];
