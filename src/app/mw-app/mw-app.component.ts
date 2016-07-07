import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { MwThemeSpinner } from '@mw/core/services/mw-theme-spinner.service';
import { MwThemePreloader } from '@mw/core/services/mw-theme-preload.service';
import { MwImageLoaderService } from '@mw/core/services/mw-image-loader.service';

@Component({
  moduleId: module.id,
  selector: 'mw-app',
  providers: [MwThemeSpinner,MwThemePreloader,MwImageLoaderService],
  templateUrl: 'mw-app.component.html',
  styleUrls: ['mw-app.component.css'],
  pipes: [],
  directives: [
  	ROUTER_DIRECTIVES,
  ]
})
export class MwAppComponent { 
	constructor(private _imageLoader:MwImageLoaderService, private _spinner:MwThemeSpinner) {
    this._loadImages();
  }

  public ngAfterViewInit():void {
    // hide spinner once all loaders are completed
    MwThemePreloader.load().then((values) => {
      this._spinner.hide();
    });
  }

  private _loadImages():void {
    // register some loaders
    MwThemePreloader.registerLoader(this._imageLoader.load('assets/images/login.jpg'));
  }
}
