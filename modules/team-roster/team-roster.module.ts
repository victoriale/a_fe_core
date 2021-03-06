import {Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import { ModuleHeaderData } from '../../components/module-header/module-header.component';
import { ModuleFooterData } from '../../components/module-footer/module-footer.component';
import { RosterTabData } from "../../components/roster/roster.component";

export interface RosterModuleData<T> {
  moduleTitle: string;
  moduleIdentifier: string;
  /**
   * Sent to Roster component
   */
  tabs: Array<RosterTabData<T>>;
}

@Component({
    selector: 'team-roster-module',
    templateUrl: './team-roster.module.html',
})

export class TeamRosterModule implements OnChanges {
    @Input() data: RosterModuleData<any>;
    @Input() activeTab;
    @Input() rosterModuleFooterUrl: Array<any>;

    @Output() tabSelectedListener = new EventEmitter();

    public headerInfo: ModuleHeaderData = {
        moduleTitle: "Team Roster",
        moduleIdentifier: "",
        hasIcon: false,
        iconClass: ""
    }; //headerInfo



    public footerInfo: ModuleFooterData = {
        infoDesc: "Want to see the full team roster?",
        text: "VIEW FULL ROSTER",
        url: this.rosterModuleFooterUrl
    }; //footerInfo



    public rosterTabSelected(newTitle) {
      this.tabSelectedListener.next(newTitle);
    } //rosterTabSelected



    ngOnChanges() {
        if ( !this.data ) {
          this.headerInfo.moduleTitle = "Team Roster";
        }
        else {
          this.headerInfo.moduleTitle = this.data.moduleTitle;
          this.headerInfo.moduleIdentifier = this.data.moduleIdentifier;
          this.footerInfo.url = this.rosterModuleFooterUrl;
        }
    }
}
