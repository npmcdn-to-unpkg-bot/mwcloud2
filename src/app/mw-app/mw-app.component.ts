import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';

import { MwThemeSpinner } from '@mw/core/services/mw-theme-spinner.service';
import { MwThemePreloader } from '@mw/core/services/mw-theme-preload.service';
import { MwImageLoaderService } from '@mw/core/services/mw-image-loader.service';
import { AppState } from '../app.state';

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
        ToasterContainerComponent
    ]
})
export class MwAppComponent {
    //private toasterService: ToasterService;
    constructor(private toasterService: ToasterService, private _state: AppState, private _imageLoader: MwImageLoaderService, private _spinner: MwThemeSpinner) {
        this._loadImages();
        this.toasterService = toasterService;
        this._state.subscribe('alert.warn', (message: string) => {
            // this.toasterService.pop('success', 'Title', message);
            // this.toasterService.pop('warning', 'Title', message);
            // this.toasterService.pop('info', 'Title', message);
            // this.toasterService.pop('error', 'Title', message);
        });
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

    private _loadImages(): void {
        // register some loaders
        MwThemePreloader.registerLoader(this._imageLoader.load('assets/images/login.jpg'));
    }
}
