import {Component, Input, Output, OnInit, OnDestroy, EventEmitter, ElementRef, Renderer} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {GlobalSettings} from "../../../global/global-settings";
import {VerticalGlobalFunctions} from "../../../global/vertical-global-functions";

@Component({
  selector: 'search-box-module',
  templateUrl: './app/fe-core/modules/search-box-module/search-box-module.module.html'
})

export class SearchBoxModule {
  @Input() scope: string;
  @Input() category:string;
  modSearchTitle:string;
  modSearchSubTitle:string;
  userInput;

    searchPlaceHolderText: string;
    searchBoxBackground:string;

    sportsList=[
       {
      key:'NFL',
      value:"NFL",
        },
      {
          key:'NCAAF',
          value:"NCAAF",
      },
      {
          key:'NBA',
          value:"NBA",
      },
      {
          key:'NCAAM',
          value:"NCAAM",
      },
      {
          key:'MLB',
          value:"MLB",
      },
      {
          key:'NHL',
          value:"NHL",
      },
      ]
  ngOnChanges(){
      this.category=="sports"?   this.modSearchTitle=GlobalSettings.getTCXscope(this.scope).searchTitle + " " + GlobalSettings.getTCXscope(this.scope).displayName.toUpperCase():this.modSearchTitle=GlobalSettings.getTCXscope(this.scope).searchTitle;
      this.modSearchSubTitle=GlobalSettings.getTCXscope(this.scope).searchSubTitle ;
      this.searchPlaceHolderText=GlobalSettings.getTCXscope(this.scope).placeHolderText;
      this.searchBoxBackground=GlobalSettings.getTCXscope(this.scope).searchBackground;
  }
  //ssearchBoxDescription: string = 'Find the players and teams you love.';
  //searchPlaceHolderText: string = 'Search for a Team or Player...';
  /*searchBoxBackground: string = '/app/public/header_texture.png';*/

  fullSearchUrl: string;

  constructor(private activeRoute:ActivatedRoute, private router:Router, private render:Renderer) {}

  onKey(event:any) {
      this.userInput=event.target.value;
      var rel_url= VerticalGlobalFunctions.createSearchLink(this.scope)+ event.target.value;
      this.fullSearchUrl = GlobalSettings.getOffsiteLink(this.scope,rel_url);

  }

  navigateSearch(e){
    window.open(this.fullSearchUrl);
      e.target.value="";
      e.target.parentElement.parentElement.children[0].lastElementChild.value="";


      //this.router.navigate(['/deep-dive',this.category, this.userInput]);
  }

    selectedSport(e){
    e=e.toLowerCase();
        this.scope=e;
        this.modSearchTitle=GlobalSettings.getTCXscope(this.scope).searchTitle + " " + GlobalSettings.getTCXscope(this.scope).displayName.toUpperCase();
        this.modSearchSubTitle=GlobalSettings.getTCXscope(this.scope).searchSubTitle ;
    //this.router.navigate(['/deep-dive',this.category, e]);

}
}
