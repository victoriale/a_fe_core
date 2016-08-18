import {Component, OnInit, OnChanges, Input, AfterContentChecked} from '@angular/core';
import {ModuleHeader, ModuleHeaderData} from '../../components/module-header/module-header.component';

// declare var twttr: any;

export interface twitterModuleData {
  twitterHandle: string;
  id: number;
  entityId: number;
  entityFirstName: string;
  entitySecondName: string;
}

@Component({
    selector: 'twitter-module',
    templateUrl: './app/fe-core/modules/twitter/twitter.module.html',
    directives: [ModuleHeader],
})

export class TwitterModule implements OnInit, OnChanges, AfterContentChecked {
  @Input() profileName: string;
  @Input() twitterData: twitterModuleData;

  twitterLoaded: boolean = false;
  twitterUrl: string;

  public headerInfo: ModuleHeaderData = {
    moduleTitle: "Twitter Feed - [Profile Name]",
    hasIcon: false,
    iconClass: ""
  };

  ngAfterContentChecked() {
    if ( window['twttr'] && !this.twitterLoaded ) {
      if ( document.getElementById("twitter-href") ) {
        var a = document.getElementById("twitter-href");
        window['twttr'].widgets.load();
        this.twitterLoaded = true;
      }
    }
  }

  ngOnChanges() {
    this.twitterUrl = "https://www.twitter.com/"+this.twitterData.twitterHandle;

    let profileName = this.profileName ? this.profileName : "[Profile Name]";
    this.headerInfo.moduleTitle = "Twitter Feed - " + profileName;
  }

  ngOnInit() {
    var script:any = document.createElement("script");
    script.innerHTML = !function(d,s,id){
      var js, fjs = d.getElementsByTagName(s)[0], p=/^http:/.test(d.location)?'http':'https';
      if(!d.getElementById(id)){
        js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js,fjs);
      }
    }(document,"script","twitter-wjs");
    document.body.appendChild(script);
  }
}