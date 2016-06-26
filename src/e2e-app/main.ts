import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';

import {E2EApp} from './e2e-app/e2e-app';
import { E2E_APP_ROUTER_PROVIDERS } from './e2e-app/e2e.app.routes';

bootstrap(E2EApp, [
  HTTP_PROVIDERS,
  E2E_APP_ROUTER_PROVIDERS
]);
