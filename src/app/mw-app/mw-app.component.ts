import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';

import { EventBus } from '@mw/core/index';
import { AuthService } from '@mw/core/index';
import { SlimLoadingBarService, SlimLoadingBar } from 'ng2-slim-loading-bar/ng2-slim-loading-bar';
import {LocalStorage} from "h5webstorage";

@Component({
    moduleId: module.id,
    selector: 'mw-app',
    providers: [
        EventBus
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
            showCloseButton: false,
            tapToDismiss: true,
            timeout: 3000
        });

    constructor(
        private toasterService: ToasterService,
        private slimLoader: SlimLoadingBarService,
        private eventBus: EventBus,
        private authService: AuthService,
        private router: Router,
        private localStorage: LocalStorage
        //private window: Window
    ) {
        this.getEmployeeInfo();
        this.handleRouteChanged();
        this.handleAlertMessage();
    }

    private getEmployeeInfo() {
        //get employee info from localstorage
        // var empInfoStr = this.window.localStorage.getItem("emp_info");
        // if (empInfoStr && empInfoStr.length > 0) {
        //     this.authService.isLogin = true;
        //     this.authService.empInfo = JSON.parse(empInfoStr);
        // } else {
        //     this.authService.isLogin = false;
        // }
        this.authService.empInfo = this.localStorage.getItem("emp_info");
        if (this.authService.empInfo) {
            this.authService.isLogin = true;
        } else {
            this.authService.isLogin = false;
        }
    }

    private handleRouteChanged() {
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
    }

    private handleAlertMessage() {
        this.eventBus.subscribe('alert.message', (message: any) => {
            console.log(JSON.stringify(message));
            let toasterBody: string = "";
            let messageType = typeof(message);
            let toasterType = "info";
            switch (messageType) {
                case "string":
                    toasterBody = message;
                    break;
                case "object":
                    if (message.message) {
                        //message.code
                        toasterType = "warning";
                        toasterBody = message.message;
                    } else if (message.statusText) {
                        //message.status
                        toasterType = "error";
                        toasterBody = message.statusText;
                    }else{
                        toasterType = "error";
                        toasterBody = "未知错误";
                    }
                    if (message.stack) {
                        console.error(message.stack);
                    }
                    break;
            }

            this.toasterService.pop(toasterType, 'Title', toasterBody);
        });
        //alert event subscribe
        // this.eventBus.subscribe('alert.warn', (message: string) => {
        //      this.toasterService.pop('success', 'success', message);
        //      this.toasterService.pop('warning', 'warning', message);
        //      this.toasterService.pop('info', 'info', message);
        //      this.toasterService.pop('error', 'error', message);
        // });
    }

}
