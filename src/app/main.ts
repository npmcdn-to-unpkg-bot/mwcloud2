import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

import { environment } from './environment';
import { MwAppComponent } from './mw-app/mw-app.component';
import { MW_APP_ROUTER_PROVIDERS } from './mw-app/mw.app.routes';

if (environment.production) {
    enableProdMode();
}
bootstrap(MwAppComponent, [
    HTTP_PROVIDERS,
    MW_APP_ROUTER_PROVIDERS,
    disableDeprecatedForms(),
  	provideForms()
])
.catch((err: any) => console.error(err));;
