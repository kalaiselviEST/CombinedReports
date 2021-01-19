import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'property-history',
  templateUrl: './property-history.component.html',
  styleUrls: ['./property-history.component.css']
})
export class PropertyHistoryComponent implements OnInit {

  @Input() contactObs: Observable<any>;
  changeSbj: Subject<any>;
  changeObs: Observable<any>;

  ownersSbj: Subject<any>;
  ownersObs: Observable<any>;

  salesHistorySbj: Subject<any>;
  salesHistoryObs: Observable<any>;

  valuationHistorySbj: Subject<any>;
  valuationHistoryObs: Observable<any>;

  taxBillingHistorySbj: Subject<any>;
  taxBillingHistoryObs: Observable<any>;

  notesCommentsSbj: Subject<any>;
  notesCommentsObs: Observable<any>;

  isLoading = true;
  isCollapsed = false;
  isRotate = false;

  selectedtabName = 'utilityBilling';
  activeTab = {
    owners: true,
    salesHistory: false,
    valuationHistory: false,
    taxBillingHistory: false,
    notesComments: false
  }

  constructor() {
    this.changeSbj = new Subject();
    this.changeObs = this.changeSbj.asObservable();

    this.ownersSbj = new Subject();
    this.ownersObs = this.ownersSbj.asObservable();

    this.salesHistorySbj = new Subject();
    this.salesHistoryObs = this.salesHistorySbj.asObservable();

    this.valuationHistorySbj = new Subject();
    this.valuationHistoryObs = this.valuationHistorySbj.asObservable();

    this.taxBillingHistorySbj = new Subject();
    this.taxBillingHistoryObs = this.taxBillingHistorySbj.asObservable();

    this.notesCommentsSbj = new Subject();
    this.notesCommentsObs = this.notesCommentsSbj.asObservable();
  }

  ngOnInit() {
    this.contactObs.subscribe(res => {
      this.broadcastChange();
    })
  }

  resetActiveTab() {
    this.activeTab = {
      owners: false,
      salesHistory: false,
      valuationHistory: false,
      taxBillingHistory: false,
      notesComments: false
    }
  }

  selectTab(tabName) {
    this.resetActiveTab();
    this.activeTab[tabName] = true;
    this.selectedtabName = tabName;
    setTimeout(() => {
      this.broadcastChange();
    },100);
  }

  broadcastChange() {
    switch (this.selectedtabName) {
      case 'owners':
        this.ownersSbj.next(this.selectedtabName);
        break;
      case 'salesHistory':
        this.salesHistorySbj.next(this.selectedtabName);
        break;
      case 'valuationHistory':
        this.valuationHistorySbj.next(this.selectedtabName);
        break;
      case 'taxBillingHistory':
        this.taxBillingHistorySbj.next(this.selectedtabName);
        break;
      case 'notesComments':
        this.notesCommentsSbj.next(this.selectedtabName);
        break;
      default:
        this.resetActiveTab();
        this.activeTab.owners = true;
        this.selectedtabName = 'owners'
        break;
    }
  }

}
