import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';

import { MwThemeSpinner } from '@mw/core/services/mw-theme-spinner.service';
import { MwThemePreloader } from '@mw/core/services/mw-theme-preload.service';
import { MwImageLoaderService } from '@mw/core/services/mw-image-loader.service';
import { AppState } from '../app.state';
import { AuthService } from '@mw/core/services/auth.service';
import { SlimLoadingBarService, SlimLoadingBar } from 'ng2-slim-loading-bar/ng2-slim-loading-bar';

@Component({
    moduleId: module.id,
    selector: 'mw-app',
    providers: [
        MwThemeSpinner,
        MwThemePreloader,
        MwImageLoaderService,
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
    constructor(
        private toasterService: ToasterService,
        private slimLoader: SlimLoadingBarService,
        private _state: AppState,
        private _imageLoader: MwImageLoaderService,
        private _spinner: MwThemeSpinner,
        private auth_service: AuthService,
        private router: Router,
        private window: Window
    ) {
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
        this._state.subscribe('alert.warn', (message: string) => {
            // this.toasterService.pop('success', 'Title', message);
            // this.toasterService.pop('warning', 'Title', message);
            // this.toasterService.pop('info', 'Title', message);
            // this.toasterService.pop('error', 'Title', message);
        });

        this.loadImages();

        //get employee info from localstorage
        var emp_info_str = this.window.localStorage.getItem("emp_info");
        if (emp_info_str && emp_info_str.length > 0) {
            this.auth_service.is_login_in = true;
            this.auth_service.emp_info = JSON.parse(emp_info_str);
        } else {
            this.auth_service.is_login_in = false;
        }
    }

    public toasterconfig: ToasterConfig =
        new ToasterConfig({
            showCloseButton: true,
            tapToDismiss: false,
            timeout: 0
        });


    public ngAfterViewInit(): void {
        // hide spinner once all loaders are completed
        MwThemePreloader.load().then((values) => {
            this._spinner.hide();
        });
    }

    private loadImages(): void {
        // register some loaders
        MwThemePreloader.registerLoader(this._imageLoader.load('assets/images/login.jpg'));
    }

}
