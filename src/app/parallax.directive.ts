import {
    Directive,
    Input,
    ElementRef,
    HostListener,
    Renderer,
    Renderer2
} from '@angular/core';
import { Config } from './app.component';
@Directive({
    selector: '[appParallax]',
    // tslint:disable-next-line:use-host-property-decorator
    host: {
        '(onScroll)': 'onContentScroll($event)'
    }
})
export class ParallaxDirective {
    @Input() config: Config;
  fabToHide;
  oldscrollTop = 0;

  isSpecialVal = false;
  cssValue = '';
  cssKey = '';
  pCssVal = '';
  cssValArray;
  constructor(private elementRef: ElementRef, private renderer: Renderer) {
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    // this.fabToHide = document.getElementsByClassName('parallax')[0];
    if (this.cssKey === '' ) {return; }
    // this.renderer.setElementStyle(this.elementRef, this.cssKey, this.config.init + 'px');
    // this.elementRef.nativeElement.style.setProperty(this.cssKey, this.config.init + 'px');
  }
  @HostListener('window:scroll', ['$event']) onWindowScroll(e) {
   this.onContentScroll(e);
  }
  onContentScroll(e) {
    this.pCssVal = this.config.css ? this.config.css : 'top';
    this.cssValArray = this.pCssVal.split(':');
    this.cssKey = this.cssValArray[0];
    this.cssValue = this.cssValArray[1];

    this.isSpecialVal = this.cssValue ? true : false;
    if (!this.cssValue) { this.cssValue = this.cssKey; }

    this.config.ratio = this.config.ratio ? +this.config.ratio : 1.1;
    this.config.init = this.config.init ? +this.config.init : 0;
    let resultVal;
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background', 'skyblue');
    const calcVal = window.pageYOffset * this.config.ratio + this.config.init;

    if (this.isSpecialVal) {
      resultVal = '' + this.cssValue + '(' + calcVal + 'px)';
    } else {
      resultVal = calcVal + 'px';
    }
    if (this.cssKey === '' ) {return; }
    console.log(this.cssKey + ':' + resultVal);
    // this.renderer.setElementStyle(this.elementRef, this.cssKey, resultVal);
    this.elementRef.nativeElement.style.setProperty(this.cssKey, resultVal);
  }

}
