import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, provide } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar/ng2-slim-loading-bar';
import { WEB_STORAGE_PROVIDERS} from "h5webstorage";

import { environment } from './environment';
import { MwAppComponent } from './mw-app/mw-app.component';
import { MW_APP_ROUTER_PROVIDERS } from './app.routes';
import { HttpService } from '@mw/core/index';

if (environment.production) {
    enableProdMode();
}

bootstrap(MwAppComponent, [
        HTTP_PROVIDERS,
        HttpService,
        ToasterService,
        SlimLoadingBarService,
        MW_APP_ROUTER_PROVIDERS,
        disableDeprecatedForms(),
        provideForms(),
        WEB_STORAGE_PROVIDERS
        //provide(Window, { useValue: window })
    ])
    .catch((err: any) => console.error(err));
