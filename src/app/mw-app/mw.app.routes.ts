import { provideRouter, RouterConfig } from '@angular/router';

import { CanDeactivateGuard } from './interfaces';
import { AuthGuard } from './auth.guard';
import { AuthService } from '@mw/core/core';

import { LoginComponent } from '../login/login.component';
import { ButtonComponent } from '../button/button.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { OrderComponent } from '../order/order.component';
import { RegisterComponent } from '../register/register.component';
import { IndexComponent } from '../index/index.component';

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
            { path: 'register', component: RegisterComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];

export const MW_APP_ROUTER_PROVIDERS = [
    provideRouter(routes), [AuthGuard, AuthService],
    CanDeactivateGuard
];
