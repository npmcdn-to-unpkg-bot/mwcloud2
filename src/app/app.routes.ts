import { provideRouter, RouterConfig, CanDeactivate } from '@angular/router';
import { Observable }    from 'rxjs/Observable';

import { AuthGuard } from '@mw/core/index';
import { AuthService } from '@mw/core/index';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ButtonComponent } from './button/button.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderComponent } from './order/order.component';
import { OrderListComponent } from './order-list/order-list.component';
import { IndexComponent } from './index/index.component';
import { BookingTableComponent } from './booking-table/booking-table.component';


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
    { path: 'register', component: RegisterComponent },
    { path: 'button', component: ButtonComponent }, {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            { path: 'index', component: IndexComponent },
            { path: 'booking-table', component: BookingTableComponent, canActivate: [AuthGuard] },
            { path: 'button', component: ButtonComponent },
            { path: 'order', component: OrderComponent, canActivate: [AuthGuard] },
            { path: 'order-list/:type', component: OrderListComponent, canActivate: [AuthGuard] }
        ]
    }
];

export const MW_APP_ROUTER_PROVIDERS = [
    provideRouter(routes), [AuthGuard, AuthService],
    CanDeactivateGuard
];
