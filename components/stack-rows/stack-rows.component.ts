import {Component,OnInit,Input} from '@angular/core';
import {RectangleImage} from '../../fe-core/components/images/rectangle-image';
import {ImageData, RectangleImageData} from '../../fe-core/components/images/image-data';
import {ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {SanitizeHtml} from "../../fe-core/pipes/safe.pipe";


export interface StackRowsInput {
  stackRowsRoute: any;
  keyword: string;
  description: string;
  publishedDate: string;
  imageConfig: RectangleImageData;
}

@Component({
  selector: 'stack-rows-component',
  templateUrl: './app/fe-core/components/stack-rows/stack-rows.component.html',
  directives: [RectangleImage, ROUTER_DIRECTIVES],
  pipes: [SanitizeHtml]
})

export class StackRowsComponent implements OnInit {
  @Input() stackRow: Array<StackRowsInput>;
  public width: number;
  public gridStackCol: string;

  //onResize(event) {
  //  this.width = event.target.innerWidth;
  //  if(this.width > 1760 || this.width < 641){
  //    this.gridStackCol = "col-xs-12";
  //  } else {
  //    this.gridStackCol = "col-xs-6";
  //  }
  //}

  ngOnInit() {}//ngOnInit ends
}
