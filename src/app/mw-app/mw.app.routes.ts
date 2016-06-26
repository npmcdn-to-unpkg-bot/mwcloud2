import { provideRouter, RouterConfig } from '@angular/router';

import { CanDeactivateGuard } from './interfaces';
import { AuthGuard }             from './auth.guard';
//import { AuthService }        from './auth.service';
import { AuthService } from '@mw/core/core';

import { Login } from '../login/login';
import { ButtonDemo } from '../button/button-demo';
import { Dashboard } from '../dashboard/dashboard';
import { Order } from '../order/order';

export const routes: RouterConfig = [
    { path: '', redirectTo: '/button', terminal: true },
    { path: 'dashboard', redirectTo: '/dashboard/order', terminal: true },
    { path: 'login', component: Login ,canDeactivate: [CanDeactivateGuard]}, 
    { path: 'button', component: ButtonDemo }, 
    {
        path: 'dashboard',
        component: Dashboard,
        children: [{
            path: 'order',
            component: Order,
            canActivate: [AuthGuard]
        }]
    }
];

export const MW_APP_ROUTER_PROVIDERS = [
    provideRouter(routes),
    [AuthGuard, AuthService],
    CanDeactivateGuard
];
