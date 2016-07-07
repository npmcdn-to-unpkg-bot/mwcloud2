import {Injectable} from '@angular/core';

@Injectable()
export class MwImageLoaderService {

  public load(src:any):Promise<any> {

    return new Promise((resolve, reject) => {
      let img = new Image();
      img.src = src;
      img.onload = function() {
        resolve('Image with src ' + src + ' loaded successfully.');
      };
    });
  }
}
