import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
//import { ROUTER_PROVIDERS } from '@angular/router';

import { MW_APP_ROUTER_PROVIDERS } from './mw-app/mw.app.routes';
import { environment } from './environment';
import { MwAppComponent } from './mw-app/mw-app.component';

if (environment.production) {
    enableProdMode();
}
bootstrap(MwAppComponent, [
    HTTP_PROVIDERS,
    MW_APP_ROUTER_PROVIDERS
]);
