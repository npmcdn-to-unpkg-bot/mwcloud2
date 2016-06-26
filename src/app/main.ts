import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
//import { ROUTER_PROVIDERS } from '@angular/router';

import { MW_APP_ROUTER_PROVIDERS } from './mw-app/mw.app.routes';
import { environment } from './environment';
import { MwApp } from './mw-app/mw-app';

if (environment.production) {
    enableProdMode();
}
bootstrap(MwApp, [
    HTTP_PROVIDERS,
    MW_APP_ROUTER_PROVIDERS
]);
