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
import { OrderStatus } from '@mw/core/index';

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
        public authService: AuthService,
        public router: Router,
        private imageLoader: MwImageLoaderService,
        private spinner: MwThemeSpinner,
        private toasterService: ToasterService
    ) {
        this.loadImages();
    }

    login() {
        this.authService.login(this.model).subscribe(
            (res) => {
                if (this.authService.isLogin) {
                    this.getPermission(res);
                }
            },
            (error) => {this.toasterService.pop("error", "Title", error);}
        );
    }

    getPermission(empId: string) {
        this.authService.getPermission(empId).subscribe(
            (res) => {
                if (this.authService.isLogin) {
                    this.router.navigate(['/dashboard/order-list/'+OrderStatus.UNPAID]);
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
            this.spinner.hide();
        });
    }

    private loadImages(): void {
        // register some loaders
        MwThemePreloader.registerLoader(this.imageLoader.load('assets/images/login.jpg'));
    }
}
