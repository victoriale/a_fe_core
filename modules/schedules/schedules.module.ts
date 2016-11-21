import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//interfaces
import { ModuleHeader, ModuleHeaderData } from '../../components/module-header/module-header.component';

@Component({
    selector: 'schedules',
    templateUrl: './app/fe-core/modules/schedules/schedules.module.html'
})

export class SchedulesModule{
    @Input() data;
    @Input() profHeader;
    @Input() error;

    @Input() filter1;
    @Input() filter2;

    @Input() dropdownKey1: string;
    @Input() dropdownKey2: string;

    @Output("tabSelected") tabSelectedListener = new EventEmitter();
    @Output() selectedKeyFilter = new EventEmitter();
    footerData:any;
    tabData: any;
    tabDisplay:any ;

    public partnerID: string;
    public scope: string;
    public teamID: string;
    public params: any;

    constructor(
      private _router:Router,
      private activateRoute: ActivatedRoute
    ){
      this.params= this.activateRoute.params.subscribe(
            (param :any)=> {
              this.partnerID = param['partnerID'];
              this.teamID = param['teamID'];
              this.scope = param['scope'] != null ? param['scope'] : 'nfl';
            }
      );
    }
    modHeadData: ModuleHeaderData;

    toLowerKebab(str:string):string {
        str = str.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[\.,']/g, '');
        return str;
    }

    getFooter(tabDisplay?){
        this.modHeadData = {
          moduleTitle: "Weekly Schedules <span class='mod-info'>- " + this.profHeader.profileName + "</span>",
          hasIcon: false,
          iconClass: '',
        }
        var url;
        var matches = this.data.tabs.filter(tab => tab.display == this.tabDisplay);
        matches = matches.length > 0 ? matches[0].data : 'pregame';
        var year = this.dropdownKey1;

        if(this.teamID != null){
          if(this.dropdownKey1 == null){
            this.dropdownKey1 = new Date().getFullYear().toString();
          }
          if(matches == 'pregame'){
            url = ['Schedules-page-team',{teamName:this.toLowerKebab(this.profHeader.profileName),
              year:'all',teamId:this.teamID,
              pageNum:1}];
          }else{
            url = ['Schedules-page-team-tab',{teamName:this.toLowerKebab(this.profHeader.profileName),
              year:this.dropdownKey1, tab: matches,teamId:this.teamID,
              pageNum:1}]
          }
          this.footerData = {
            infoDesc: 'Want to see the full season schedule?',
            text: 'VIEW SCHEDULE',
            url: url
          };
        }else{
          if(this.dropdownKey1 == null){
            this.dropdownKey1 = new Date().getFullYear().toString();
          }
          if(matches == 'pregame'){
            url = ['Schedules-page-league', {year:'all',pageNum:1}]
          }else{
            url = ['Schedules-page-league-tab', {year:this.dropdownKey1,tab: matches,pageNum:1}]
          }
          this.footerData = {
            infoDesc: 'Want to see the full season schedule?',
            text: 'VIEW SCHEDULE',
            url: url
          };
        }
    }

    ngOnChanges(){
        if(typeof this.data != 'undefined'){
            this.tabData = this.data.tabs;
        }
        if(this.filter1 != null){
          if(this.filter1.length > 0 && this.dropdownKey1 == null){
            this.dropdownKey1 = this.filter1[0].key;
          }
        }
        if(this.filter2 != null){
          if(this.filter2.length > 0 && this.dropdownKey2 == null){
            this.dropdownKey2 = this.filter2[0].key;
          }
        }
        if(this.footerData){
          if(this.dropdownKey1 == null){
            this.dropdownKey1 = new Date().getFullYear().toString();
          }
        }
        this.getFooter();
    }

    filterSelected(event){
      this.selectedKeyFilter.next(event);
    }

    tabSelected(tab) {
      this.tabDisplay = tab;
      this.getFooter(tab);
        this.tabSelectedListener.next(tab);
    }
}
