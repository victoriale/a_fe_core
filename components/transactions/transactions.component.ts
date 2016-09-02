import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {RouteParams} from '@angular/router-deprecated';
import {Injectable} from '@angular/core';

import {TransactionsListItem, TransactionsListInput} from '../../components/transactions-list-item/transactions-list-item.component';
import {SliderCarousel, SliderCarouselInput} from '../../components/carousels/slider-carousel/slider-carousel.component';
import {Tabs} from '../../components/tabs/tabs.component';
import {Tab} from '../../components/tabs/tab.component';
import {NoDataBox} from '../../components/error/data-box/data-box.component';
import {DropdownComponent} from "../../components/dropdown/dropdown.component";
import {LoadingComponent} from '../../components/loading/loading.component';

export interface TransactionTabData {
  tabDataKey: string;
  tabDisplay: string;
  isLoaded: boolean;
  sortTitle?: string;
  sortOptions?: Array<{key: string, value: string}>;
  selectedSort?: string;
  includeDropdown?: boolean;
  errorMessage?: string;
  dataArray?: Array<TransactionsListInput>;//array of data for transactions list
  carData?: Array<SliderCarouselInput>;
}


@Component({
  selector: 'transactions',
  templateUrl: './app/fe-core/components/transactions/transactions.component.html',
  directives: [NoDataBox, Tab, Tabs, SliderCarousel, DropdownComponent, TransactionsListItem, LoadingComponent]
})

export class TransactionsComponent implements OnInit {
  @Output() tabSwitched = new EventEmitter();
  @Output() transactionKeyFilter = new EventEmitter();

  @Input() tabs: Array<TransactionTabData>;
  @Input() transactionFilter1 : Array<{key:string, value:string}>;
  @Input() dropdownKey1: string;

  carouselDataArray: Array<SliderCarouselInput>;
  pageName: string;

  private selectedTabTitle: string;
  private selectedFilterTitle: string;
  private tabsLoaded: {[index:number]:string};

  private selectedDropdownTitle: string;

  ngDoCheck() {
    if ( this.tabs && this.tabs.length > 0 ) {
      if ( !this.tabsLoaded  ) {
        this.tabsLoaded = {};
        var selectedTitle = this.tabs[0].tabDisplay;
        this.selectedTab(selectedTitle);
      }
      else {
        let selectedTab = this.getSelectedTab();
        if ( selectedTab && selectedTab.dataArray && !this.tabsLoaded[selectedTab.tabDisplay] ) {
          this.updateCarousel();
          this.tabsLoaded[selectedTab.tabDisplay] = "1";
        }
      }
    }
  }

  ngOnInit() {
    if(this.transactionFilter1 != null){
      this.dropdownKey1 = this.transactionFilter1[0].key;
    }
  }

  updateCarousel() {
    console.log('update carousel');
    var selectedTab = this.getSelectedTab();
    if ( selectedTab ) {
      this.carouselDataArray = selectedTab.carData;
    }
    else {
      // an error occurred because tab is null
    }
  }

  getSelectedTab() {
    var tabs = this.tabs.filter(tab => tab.tabDisplay == this.selectedTabTitle);
    return tabs.length > 0 ? tabs[0] : null;
  }

  selectedTab(event){
    this.selectedTabTitle = event;
    var selectedTab = this.getSelectedTab();
    this.tabSwitched.next(selectedTab);
    this.updateCarousel();
    this.pageName = this.selectedTabTitle;
  }

  transactionDropdownChange(event) {
    this.selectedFilterTitle = event.key;
    this.transactionKeyFilter.next(event);
    this.updateCarousel();
  }
}
