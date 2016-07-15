import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@mw/core/core';
import { AuthModel } from '@mw/core/models/auth.model';
import { AppState } from '../app.state';
import { MwThemeSpinner } from '@mw/core/services/mw-theme-spinner.service';
import { MwThemePreloader } from '@mw/core/services/mw-theme-preload.service';
import { MwImageLoaderService } from '@mw/core/services/mw-image-loader.service';

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
    directives: [],
})
export class LoginComponent {
    model = new AuthModel("", "", true);
    constructor(
        private _state: AppState, 
        public authService: AuthService, 
        public router: Router,
        private _imageLoader: MwImageLoaderService,
        private _spinner: MwThemeSpinner
    ) {
        this.loadImages();
    }

    login() {
        // this.slimLoadingBarService.start(() => {
        //     console.log('Loading complete');
        // });
        let self = this;
        this.authService.login(this.model).subscribe(
            (res) => {
                if (self.authService.is_login_in) {
                    self.get_permission(res);
                }
            },
            (error) => {}
        );
    }

    get_permission(emp_id: string) {
        let self = this;
        this.authService.get_permission(emp_id).subscribe(
            (res) => {
                if (self.authService.is_login_in) {
                    self.router.navigate(['/dashboard/order-list']);
                }
            },
            (error) => {}
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
