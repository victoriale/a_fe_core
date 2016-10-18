import { Component, OnInit, Input } from '@angular/core';
import { DeepDiveService } from '../../../../services/deep-dive.service';
import { ArticleStackData, VideoStackData, SectionNameData } from "../../../interfaces/deep-dive.data";
import { GlobalSettings } from "../../../../global/global-settings";
import { GlobalFunctions } from "../../../../global/global-functions";
import { VerticalGlobalFunctions } from "../../../../global/vertical-global-functions";

declare var moment;

@Component({
  selector: 'deep-dive-block-main',
  templateUrl: './app/fe-core/modules/deep-dive-blocks/deep-dive-block-main/deep-dive-block-main.module.html',
})

export class DeepDiveBlockMain implements OnInit {
  @Input() geoLocation: string;
  private breakingStack: Array<ArticleStackData>;
  private recDataSports: Array<ArticleStackData>;
  private businessStack: Array<ArticleStackData>;
  private politicsStack: Array<ArticleStackData>;
  private recDataEntertain: Array<ArticleStackData>;
  private foodStack: Array<ArticleStackData>;
  private recDataHealth: Array<ArticleStackData>;
  private lifestyleStack: Array<ArticleStackData>;
  private estateStack: Array<ArticleStackData>;
  private recDataTravel: Array<ArticleStackData>;
  private weatherStack: Array<ArticleStackData>;
  private recDataAuto: Array<ArticleStackData>;

  private videoDataBatch1: Array<VideoStackData>;
  private videoDataBatch2: Array<VideoStackData>;
  private videoDataBatch3: Array<VideoStackData>;

  private secName: Array<SectionNameData>;
  private articleCallLimit:number = 50;
  private batchNum: number = 1;
  private homePageBlocks = ["breaking", "video", "sports", "business", "politics", "entertainment", "food", "video", "health", "lifestyle", "real-estate", "travel", "weather", "video", "automotive"];
 constructor(private _deepDiveData: DeepDiveService){}

 getSectionNameData(){
   var sectionNameArray = [];
   this.homePageBlocks.forEach(function(val, index){
     var d = {
       icon: val != 'video' ? GlobalSettings.getTCXscope(val).icon : 'fa-play-circle',
       title: val != 'video' ? GlobalFunctions.toTitleCase(GlobalSettings.getTCXscope(val).displayName) : 'Video',
       route: val != 'video' ? VerticalGlobalFunctions.formatSectionFrontRoute(GlobalSettings.getTCXscope(val).topScope) : null
     }
     sectionNameArray.push(d);
   });
   return sectionNameArray;
 }

  getBreakingData(){
    this._deepDiveData.getDeepDiveBatchService("breaking", this.articleCallLimit, this.batchNum, this.geoLocation)
        .subscribe(data => {
          this.breakingStack  = this._deepDiveData.transformToArticleStack(data.data.slice(0,7), "breaking");
        },
        err => {
            console.log("Error getting Breaking News data");
        });
  }
  getSportsData(){
    this._deepDiveData.getDeepDiveBatchService("sports", this.articleCallLimit, this.batchNum, this.geoLocation)
        .subscribe(data => {
          this.recDataSports = this._deepDiveData.transformToArticleStack(data.data.slice(0,6), "sports");
        },
        err => {
            console.log("Error getting Sports News data");
        });
  }
  getBusinessData(){
    this._deepDiveData.getDeepDiveBatchService("business", this.articleCallLimit, this.batchNum, this.geoLocation)
        .subscribe(data => {
          this.businessStack = this._deepDiveData.transformToArticleStack(data.data.slice(0,7), "business");
        },
        err => {
            console.log("Error getting Business News data");
        });
  }
  getPoliticsData(){
    this._deepDiveData.getDeepDiveBatchService("politics", this.articleCallLimit, this.batchNum, this.geoLocation)
        .subscribe(data => {
          this.politicsStack = this._deepDiveData.transformToArticleStack(data.data.slice(0,5), "politics");
        },
        err => {
            console.log("Error getting Politics News data");
        });
  }
  getEtertainData(){
    this._deepDiveData.getDeepDiveBatchService("entertain", this.articleCallLimit, this.batchNum, this.geoLocation)
        .subscribe(data => {
          this.recDataEntertain = this._deepDiveData.transformToArticleStack(data.data.slice(0,6), "entertain");
        },
        err => {
            console.log("Error getting Entertain News data");
        });
  }
  getHealthData(){
    this._deepDiveData.getDeepDiveBatchService("health", this.articleCallLimit, this.batchNum, this.geoLocation)
        .subscribe(data => {
          this.recDataHealth = this._deepDiveData.transformToArticleStack(data.data.slice(0,6), "health");
        },
        err => {
            console.log("Error getting Health News data");
        });
  }
  getLifeStyleData(){
    this._deepDiveData.getDeepDiveBatchService("lifestyle", this.articleCallLimit, this.batchNum, this.geoLocation)
        .subscribe(data => {
          this.lifestyleStack = this._deepDiveData.transformToArticleStack(data.data.slice(0,7), "lifestyle");
        },
        err => {
            console.log("Error getting Lifestyle News data");
        });
  }
  getRealEstateData(){
    this._deepDiveData.getDeepDiveBatchService("realestate", this.articleCallLimit, this.batchNum, this.geoLocation)
        .subscribe(data => {
          this.estateStack = this._deepDiveData.transformToArticleStack(data.data.slice(0,5), "realestate");
        },
        err => {
            console.log("Error getting Real Estate News data");
        });
  }
  getTravelData(){
    this._deepDiveData.getDeepDiveBatchService("travel", this.articleCallLimit, this.batchNum, this.geoLocation)
        .subscribe(data => {
          this.recDataTravel = this._deepDiveData.transformToArticleStack(data.data.slice(0,6), "travel");
        },
        err => {
            console.log("Error getting Travel News data");
        });
  }
  getWeatherData(){
    this._deepDiveData.getDeepDiveBatchService("weather", this.articleCallLimit, this.batchNum, this.geoLocation)
        .subscribe(data => {
          this.weatherStack = this._deepDiveData.transformToArticleStack(data.data.slice(0,7), "weather");
        },
        err => {
            console.log("Error getting Weather News data");
        });
  }
  getAutomotiveData(){
    this._deepDiveData.getDeepDiveBatchService("automotive", this.articleCallLimit, this.batchNum, this.geoLocation)
        .subscribe(data => {
          this.recDataAuto = this._deepDiveData.transformToArticleStack(data.data.slice(0,6), "automotive");
        },
        err => {
            console.log("Error getting Automotive News data");
        });
  }
  getDeepDiveVideo(){
      this._deepDiveData.getDeepDiveVideoBatchService("sports", 15, 1, this.geoLocation)
      .subscribe(data => {
          console.log(data);
          // let videoBatch1 = data.data.splice(0, 5);
          // let videoBatch2 = data.data.splice(0, 5);
          // let videoBatch3 = data.data.splice(0, 5);
          // this.videoDataBatch1 = videoBatch1 ? this._deepDiveData.transformSportVideoBatchData(videoBatch1, "sports") : null;
          // this.videoDataBatch2 = videoBatch2 ? this._deepDiveData.transformSportVideoBatchData(videoBatch2, "sports") : null;
          // this.videoDataBatch3 = videoBatch3 ? this._deepDiveData.transformSportVideoBatchData(videoBatch3, "sports") : null;
        },
        err => {
          console.log("Error getting video batch data");
      });
  }
  callModules(){
    this.getBreakingData();
    this.getSportsData();
    this.getBusinessData();
    this.getPoliticsData();
    this.getEtertainData();
    this.getHealthData();
    this.getLifeStyleData();
    this.getRealEstateData();
    this.getTravelData();
    this.getWeatherData();
    this.getAutomotiveData();
    this.getDeepDiveVideo();
  }

  ngOnInit() {
    this.secName = this.getSectionNameData();
    this.callModules();
  }
}
