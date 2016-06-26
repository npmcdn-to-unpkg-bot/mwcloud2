import { provideRouter, RouterConfig } from '@angular/router';

import { CanDeactivateGuard } from './interfaces';
import { AuthGuard }             from './auth.guard';
//import { AuthService }        from './auth.service';
import { AuthService } from '@mw/core/core';

import { LoginComponent } from '../login/login.component';
import { ButtonComponent } from '../button/button.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { OrderComponent } from '../order/order.component';

export const routes: RouterConfig = [
    { path: '', redirectTo: '/login', terminal: true },
    { path: 'dashboard', redirectTo: '/dashboard/order', terminal: true },
    { path: 'login', component: LoginComponent ,canDeactivate: [CanDeactivateGuard]}, 
    { path: 'button', component: ButtonComponent }, 
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [{
            path: 'order',
            component: OrderComponent,
            canActivate: [AuthGuard]
        }]
    }
];

export const MW_APP_ROUTER_PROVIDERS = [
    provideRouter(routes),
    [AuthGuard, AuthService],
    CanDeactivateGuard
];
