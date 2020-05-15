import {
    Directive,
    Input,
    ElementRef,
    HostListener,
    Renderer,
    Renderer2
} from '@angular/core';
import { ParallaxConfig } from './parallaxConfig';
@Directive({
    selector: '[appParallax]',
    // tslint:disable-next-line:use-host-property-decorator
    host: {
        '(onScroll)': 'onContentScroll($event)'
    }
})
export class ParallaxDirective {
    @Input() config: ParallaxConfig;
  fabToHide;
  oldscrollTop = 0;

  isSpecialVal = false;
  cssValue = '';
  cssKey = '';
  pCssVal = '';
  cssValArray;
  constructor(private elementRef: ElementRef, private renderer: Renderer) {
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
    const calcVal = window.pageYOffset * this.config.ratio + this.config.init;

    if (this.isSpecialVal) {
      resultVal = '' + this.cssValue + '(' + calcVal + 'px)';
    } else {
      resultVal = calcVal + 'px';
    }
    if (this.cssKey === '' ) {return; }
    this.elementRef.nativeElement.style.setProperty(this.cssKey, resultVal);
  }

}
