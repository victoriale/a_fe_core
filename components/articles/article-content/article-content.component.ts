import { Component, Input, OnInit } from '@angular/core';
import { isBrowser } from 'angular2-universal';
@Component({
    selector: 'article-content-component',
    templateUrl: './article-content.component.html'
})

export class ArticleContentComponent implements OnInit {
    @Input() articleData:any;
    @Input() articleType:any;
    @Input() articleSubType:any;
    @Input() imageLinks:any;
    @Input() partnerId:any;
    @Input() scope:any;
    @Input() teamId:any;
    isSmall:boolean = false;

    onResize(event) {
        this.isSmall = event.target.innerWidth < 640;
    }

    ngOnInit() {
      if(isBrowser){
        this.isSmall = window.innerWidth < 640;
      }
    }
}
