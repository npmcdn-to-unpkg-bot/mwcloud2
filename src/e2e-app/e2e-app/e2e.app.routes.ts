import { provideRouter, RouterConfig } from '@angular/router';

import { ButtonE2E } from '../button/button-e2e';

export const routes: RouterConfig = [
    { path: '', redirectTo: '/button', terminal: true },
    { path: 'button', component: ButtonE2E }, 
];

export const E2E_APP_ROUTER_PROVIDERS = [
    provideRouter(routes),
];
