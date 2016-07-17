import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { MD_LIST_DIRECTIVES } from '@angular2-material/list/list';
import { MdToolbar } from '@angular2-material/toolbar/toolbar';
import { MdButton } from '@angular2-material/button/button';
import { MwThemeSpinner } from '@mw/core/index';
import { MwThemePreloader } from '@mw/core/index';
import { MwImageLoaderService } from '@mw/core/index';

@Component({
    moduleId: module.id,
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css'],
    providers: [
        MwThemeSpinner,
        MwThemePreloader,
        MwImageLoaderService
    ],
    directives: [
        ROUTER_DIRECTIVES,
        MdButton,
        MD_LIST_DIRECTIVES,
        MdToolbar
    ]
})
export class DashboardComponent {
    constructor(
        private _imageLoader: MwImageLoaderService,
        private _spinner: MwThemeSpinner
    ) {
        //this.loadImages();
    }

    public ngAfterViewInit(): void {
        // hide spinner once all loaders are completed
        //MwThemePreloader.load().then((values) => {
            this._spinner.hide();
        //});
    }

    private loadImages(): void {
        // register some loaders
        MwThemePreloader.registerLoader(this._imageLoader.load('assets/images/login.jpg'));
    }
}
