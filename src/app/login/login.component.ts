import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdCheckbox } from '@angular2-material/checkbox';
import { MdButton } from '@angular2-material/button';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar/ng2-slim-loading-bar';

import { AuthService } from '@mw/core/index';
import { AuthModel } from '@mw/core/index';
import { MwThemeSpinner } from '@mw/core/index';
import { MwThemePreloader } from '@mw/core/index';
import { MwImageLoaderService } from '@mw/core/index';
import { OrderStatus } from '@mw/core/index';
import { EventBus } from '@mw/core/index';

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
        private eventBus: EventBus,
        private slimLoader: SlimLoadingBarService
    ) {
        this.loadImages();
    }

    login() {
        this.slimLoader.start();
        this.authService.login(this.model).subscribe(
            (res) => {
                if (this.authService.isLogin) {
                    this.getPermission(res);
                }else{
                    this.slimLoader.complete();
                }
            },
            (error) => {
                this.slimLoader.complete();
                this.eventBus.notifyDataChanged("alert.message", error);
            }
        );
    }

    getPermission(empId: string) {
        this.authService.getPermission(empId).subscribe(
            (res) => {
                this.slimLoader.complete();
                if (this.authService.isLogin) {
                    this.router.navigate(['/dashboard/order-list/'+OrderStatus.UNPAID]);
                }
            },
            (error) => {
                this.slimLoader.complete();
                this.eventBus.notifyDataChanged("alert.message", error);
            }
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
