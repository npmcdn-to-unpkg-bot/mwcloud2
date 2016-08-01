import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { MD_LIST_DIRECTIVES } from '@angular2-material/list/list';
import { MdToolbar } from '@angular2-material/toolbar/toolbar';
import { MdButton } from '@angular2-material/button/button';
import { MwThemeSpinner } from '@mw/core/index';
import { MwThemePreloader } from '@mw/core/index';
import { MwImageLoaderService } from '@mw/core/index';
import { OrderStatus } from '@mw/core/index';
import { EventBus } from '@mw/core/index';
import { AuthService } from '@mw/core/index';

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
    private OrderStatusEnum = OrderStatus;
    selectedMenu:string = "order";
    sideMenuState:string = "small";
    constructor(
        private imageLoader: MwImageLoaderService,
        private spinner: MwThemeSpinner,
        private eventBus :EventBus,
        private authService: AuthService
    ) {
        //this.loadImages();
        
        //menu select subscribe
        this.eventBus.subscribe('menu.select', (menuName: string) => {
             this.selectedMenu = menuName;
        });
        this.getPermission(this.authService.empInfo.empId);
    }

    public ngAfterViewInit(): void {
        // hide spinner once all loaders are completed
        //MwThemePreloader.load().then((values) => {
            this.spinner.hide();
        //});
    }

    private getPermission(empId: string) {
        this.authService.getPermission(empId).subscribe(
            (res) => {},
            (error) => {
                //this.slimLoader.complete();
                this.eventBus.notifyDataChanged("alert.message", error);
            }
        );
    }

    private loadImages(): void {
        // register some loaders
        MwThemePreloader.registerLoader(this.imageLoader.load('assets/images/login.jpg'));
    }
}
