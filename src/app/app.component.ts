import { Component } from '@angular/core';
import { ParallaxConfig } from './parallaxConfig';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';

   div1: ParallaxConfig = {ratio: 0.1, init: 0, css: 'transform:translateY'};
  div2: ParallaxConfig = {ratio: 0.5, init: -100, css: 'background-position-y'};
  p: ParallaxConfig = {ratio: 0.9, init: 100, css: 'top'};

  url='https://en.wikipedia.org/wiki/List_of_highest_mountains_on_Earth#/media/File:Mount_Everest_as_seen_from_Drukair2_PLW_edit.jpg';
}
