import {Component, OnInit, Input} from '@angular/core';
declare var stButtons: any;

@Component({
    selector: 'shareLinks-component',
    templateUrl: './app/fe-core/components/articles/shareLinks/shareLinks.component.html',
    directives: [],
})

export class ShareLinksComponent  {
    public locateShareThis = function(){
        stButtons.locateElements();
    };
}