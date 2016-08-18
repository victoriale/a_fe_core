import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {NgClass} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {Link} from '../../../global/global-interface';
import {PagingData} from './directory.data';

@Component({
    selector: 'directory-pagination',
    templateUrl: './app/fe-core/modules/directory/directory-pagination.component.html',
    directives: [ROUTER_DIRECTIVES, NgClass],
    providers: []
})

export class DirectoryPagination implements OnChanges {
  @Input() data: PagingData;
  @Input() nextLink: Link;
  @Input() prevLink: Link;
  @Input() lastLink: Link;
  @Input() firstLink: Link;
  @Input() dirRangeTotal: boolean;
  @Input() dirPagination: boolean;
  public enablePrev: boolean;
  public enableNext: boolean;
  public enableLast: boolean;
  public enableFirst: boolean;

  constructor() {
    this.pagesUpdated();
  }

  ngOnChanges() {
    this.pagesUpdated();
  }

  pagesUpdated() {
    if ( this.data !== undefined && this.data !== null ) {
      this.enableNext = this.data.currentPage + 1 <= this.data.totalPages;
      this.enablePrev = this.data.currentPage - 1 > 0;
      this.enableLast = this.data.currentPage + 1 <= this.data.totalPages;
      this.enableFirst = this.data.currentPage - 1 > 0;
    }
    else {
      this.enableNext = false;
      this.enablePrev = false;
      this.enableLast = false;
      this.enableFirst = false;
    }
  }
}