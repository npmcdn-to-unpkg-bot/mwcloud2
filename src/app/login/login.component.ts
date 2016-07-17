import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdCheckbox } from '@angular2-material/checkbox';
import { MdButton } from '@angular2-material/button';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';

import { AuthService } from '@mw/core/core';
import { AuthModel } from '@mw/core/models/auth.model';
import { AppState } from '../app.state';
import { MwThemeSpinner } from '@mw/core/services/mw-theme-spinner.service';
import { MwThemePreloader } from '@mw/core/services/mw-theme-preload.service';
import { MwImageLoaderService } from '@mw/core/services/mw-image-loader.service';
import { ToasterService } from 'angular2-toaster/angular2-toaster';

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css'],
    providers: [
        MwThemeSpinner,
        MwThemePreloader,
        MwImageLoaderService
    ],
    directives: [MdCheckbox, MdButton, MD_INPUT_DIRECTIVES],
})
export class LoginComponent {
    model = new AuthModel("", "", true);
    constructor(
        private _state: AppState,
        public authService: AuthService,
        public router: Router,
        private _imageLoader: MwImageLoaderService,
        private _spinner: MwThemeSpinner,
        private toasterService: ToasterService
    ) {
        this.loadImages();
    }

    login() {
        this.authService.login(this.model).subscribe(
            (res) => {
                if (this.authService.is_login_in) {
                    this.get_permission(res);
                }
            },
            (error) => {this.toasterService.pop("error", "Title", error);}
        );
    }

    get_permission(emp_id: string) {
        this.authService.get_permission(emp_id).subscribe(
            (res) => {
                if (this.authService.is_login_in) {
                    this.router.navigate(['/dashboard/order-list/1']);
                }
            },
            (error) => {this.toasterService.pop("error", "Title", error);}
        );
    }

    logout() {
        this.authService.logout();
    }

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
