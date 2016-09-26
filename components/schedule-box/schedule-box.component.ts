import {Component, Input, OnInit} from '@angular/core';
import {CircleImageData} from '../images/image-data';


export interface scheduleBoxInput{
  date:string;
  awayImageConfig:CircleImageData,
  homeImageConfig:CircleImageData,
  awayTeamName:string,
  homeTeamName:string,
  awayLink:any;
  homeLink:any;
  reportDisplay:string,
  reportLink:any,
  isLive: string,
  inning: string
}

@Component({
    selector: 'schedule-box',
    templateUrl: './app/fe-core/components/schedule-box/schedule-box.component.html'
})

export class ScheduleBox{
  @Input() boxData: Array<scheduleBoxInput>;
    constructor() {
    }

    ngOnInit(){
      if(typeof this.boxData == 'undefined'){
        this.boxData = [{
          date:"[Month] [DD] [YYYY] <i class='fa fa-circle'></i> [Time PM]",
          awayImageConfig:{//interface is found in image-data.ts
              imageClass: 'image-44',
              mainImage: {
                  imageUrl: '/app/public/no-image.svg',
                  urlRouteArray: ['Home-page'],
                  hoverText: "<i class='fa fa-mail-forward'></i>",
                  imageClass: 'border-1',
              },
          },
          homeImageConfig:{//interface is found in image-data.ts
              imageClass: 'image-44',
              mainImage: {
                  imageUrl: '/app/public/no-image.svg',
                  urlRouteArray: ['Home-page'],
                  hoverText: "<i class='fa fa-mail-forward'></i>",
                  imageClass: 'border-1',
              },
          },
          awayTeamName:'Blue Jays',
          homeTeamName:'Orioles',
          awayLink:['Error-page'],
          homeLink:['Error-page'],
          reportDisplay:'Mid Game Report',
          reportLink:'/pick-a-team',
          isLive: '',
          inning: '0'
        }]
      }
    }
}
