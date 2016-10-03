import {Component, Input, ElementRef} from '@angular/core';
import { Larousel } from '../larousel/larousel';

declare var moment:any;

@Component({
    selector: 'news-box',
    templateUrl: './app/fe-core/components/news-box/news-box.html',
    outputs: ['carouselCount'],
})

export class NewsBox{
  @Input() videoData: any;
  @Input() carData: any;
  private displayedItems: any;

  constructor(private _elRef: ElementRef){

  }

  displayArray(event){
    if(event != null){
      this.displayedItems = event;
    }
  }
}