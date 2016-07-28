import { Directive, ElementRef, HostListener, Input ,SimpleChange,AfterViewInit,OnChanges} from '@angular/core';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/delay';
// import 'rxjs/add/operator/do';
import {TimerWrapper} from '@angular/core/src/facade/async';

@Directive({ selector: '[mwCollapse]' })
export class MwCollapseDirective implements AfterViewInit,OnChanges{
    private _property:string = "horizontal";
    private height:string;
    private el: HTMLElement;
    constructor(el: ElementRef) { 
        this.el = el.nativeElement;
        this.el.style.transition = 'all 0.2s';
    }

    @Input('mwCollapse') collapse: boolean;

    /*
        竖向:"vertical"
        横向:"horizontal"
    */
    @Input() set prop(prop: string) {
        this._property = prop || this._property;
    }

    ngAfterViewInit(){
        //debugger;
        // Observable.of(true)
        // .delay(1000)
        // .do((val) => {
        //     debugger;
        //     this.height = this.el.style.height;
        // });
        //this.height = this.el.clientHeight+"px";
        if(this._property == "vertical"){
            TimerWrapper.setTimeout(() => {
                this.height = this.el.clientHeight+"px";
            }, 1000);
        }
    }

    ngOnChanges(changes: {[propName: string]: SimpleChange}) {
        if (changes.hasOwnProperty('collapse')) {
            if(changes['collapse'].currentValue){
                if(this._property == "horizontal"){
                    this.el.style.width = "0px";
                }else{
                    this.el.style.height = "0px";
                }
            }else{
                if(this._property == "horizontal"){
                    this.el.style.width = "210px";
                }else{
                    this.el.style.height = this.height;
                }
            }
        }
    }
    // @HostListener('mouseenter') onMouseEnter() {
    //     this.highlight(this.highlightColor || this._defaultColor);
    // }
    // @HostListener('mouseleave') onMouseLeave() {
    //     this.highlight(null);
    // }
    // private highlight(color: string) {
    //     this.el.style.backgroundColor = color;
    // }
}
