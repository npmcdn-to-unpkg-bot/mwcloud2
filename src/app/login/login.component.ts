import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdCheckbox } from '@angular2-material/checkbox';
import { MdButton } from '@angular2-material/button';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';

import { AuthService } from '@mw/core/index';
import { AuthModel } from '@mw/core/index';
import { MwThemeSpinner } from '@mw/core/index';
import { MwThemePreloader } from '@mw/core/index';
import { MwImageLoaderService } from '@mw/core/index';
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
        public auth_service: AuthService,
        public router: Router,
        private image_loader: MwImageLoaderService,
        private spinner: MwThemeSpinner,
        private toaster_service: ToasterService
    ) {
        this.loadImages();
    }

    login() {
        this.auth_service.login(this.model).subscribe(
            (res) => {
                if (this.auth_service.is_login_in) {
                    this.get_permission(res);
                }
            },
            (error) => {this.toaster_service.pop("error", "Title", error);}
        );
    }

    get_permission(emp_id: string) {
        this.auth_service.get_permission(emp_id).subscribe(
            (res) => {
                if (this.auth_service.is_login_in) {
                    this.router.navigate(['/dashboard/order-list/1']);
                }
            },
            (error) => {this.toaster_service.pop("error", "Title", error);}
        );
    }

    logout() {
        this.auth_service.logout();
    }

    public ngAfterViewInit(): void {
        // hide spinner once all loaders are completed
        MwThemePreloader.load().then((values) => {
            this.spinner.hide();
        });
    }

    private loadImages(): void {
        // register some loaders
        MwThemePreloader.registerLoader(this.image_loader.load('assets/images/login.jpg'));
    }
}
