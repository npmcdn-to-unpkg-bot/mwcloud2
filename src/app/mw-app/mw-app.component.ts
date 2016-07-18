import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';

import { AppState } from '../app.state';
import { AuthService } from '@mw/core/index';
import { SlimLoadingBarService, SlimLoadingBar } from 'ng2-slim-loading-bar/ng2-slim-loading-bar';

@Component({
    moduleId: module.id,
    selector: 'mw-app',
    providers: [
        AppState
    ],
    templateUrl: 'mw-app.component.html',
    styleUrls: ['mw-app.component.css'],
    pipes: [],
    directives: [
        ROUTER_DIRECTIVES,
        ToasterContainerComponent,
        SlimLoadingBar
    ]
})
export class MwAppComponent {
    toasterConfig: ToasterConfig =
        new ToasterConfig({
            showCloseButton: true,
            tapToDismiss: false,
            timeout: 3000
        });

    constructor(
        private toasterService: ToasterService,
        private slimLoader: SlimLoadingBarService,
        private appState: AppState,
        private authService: AuthService,
        private router: Router,
        private window: Window
    ) {
        //get employee info from localstorage
        var empInfoStr = this.window.localStorage.getItem("emp_info");
        if (empInfoStr && empInfoStr.length > 0) {
            this.authService.isLogin = true;
            this.authService.empInfo = JSON.parse(empInfoStr);
        } else {
            this.authService.isLogin = false;
        }

        //router events
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationStart) {
                this.slimLoader.start();
            } else if (event instanceof NavigationEnd) {
                this.slimLoader.complete();
            } else if (event instanceof NavigationError) {
                this.slimLoader.stop();
            } else {
                this.slimLoader.complete();
            }
        });

        //alert event subscribe
        this.appState.subscribe('alert.warn', (message: string) => {
             this.toasterService.pop('success', 'success', message);
             this.toasterService.pop('warning', 'warning', message);
             this.toasterService.pop('info', 'info', message);
             this.toasterService.pop('error', 'error', message);
        });
    }

}
