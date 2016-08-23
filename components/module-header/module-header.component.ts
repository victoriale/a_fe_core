import {Component, Input, OnInit} from '@angular/core';

export interface ModuleHeaderData {
  moduleTitle:string,
  moduleIdentifier?: string,
  hasIcon: boolean,
  iconClass: string,
}

@Component({
    selector: 'module-header',
    templateUrl: './app/fe-core/components/module-header/module-header.component.html',
    directives:[],
    providers: []
})

export class ModuleHeader {
   @Input() modHeadData: ModuleHeaderData;
   moduleTitle: string = "";

   ngOnInit(){
     if(typeof this.modHeadData == 'undefined'){
       this.modHeadData = {
         moduleTitle: "Module Title [Here]",
         hasIcon: false,
         iconClass: '',
       }
     }// end of placeholder if statement
   }
}
