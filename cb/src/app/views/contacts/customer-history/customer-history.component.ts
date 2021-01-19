import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'customer-history',
  templateUrl: './customer-history.component.html',
  styleUrls: ['./customer-history.component.css'],
  animations: [
    trigger('smoothCollapse', [
      state('initial', style({
        height:'0',
        overflow:'hidden'
      })),
      state('final', style({
        overflow:'hidden'
      })),
      transition('initial=>final', animate('300ms')),
      transition('final=>initial', animate('300ms'))
    ]),
    trigger('smoothRotate', [
      state('initial', style({
        transform: 'rotate(-90deg)'
      })),
      state('final', style({
        transform: 'rotate(0deg)'
      })),
      transition('initial=>final', animate('0.3s')),
      transition('final=>initial', animate('0.3s'))
    ])
  ]
})
export class CustomerHistoryComponent implements OnInit {

  @Input() contactObs: Observable<any>;
  changeSbj: Subject<any>;
  changeObs: Observable<any>;

  utilitySbj: Subject<any>;
  utilityObs: Observable<any>;

  propertySbj: Subject<any>;
  propertyObs: Observable<any>;

  courtSbj: Subject<any>;
  courtObs: Observable<any>;

  otherSbj: Subject<any>;
  otherObs: Observable<any>;

  isLoading = true;
  isCollapsed = false;
  isRotate = false;

  selectedtabName = 'utilityBilling';
  activeTab = {
    utilityBilling: true,
    propertyTax: false,
    court: false,
    other: false
  }

  constructor() {
    this.changeSbj = new Subject();
    this.changeObs = this.changeSbj.asObservable();

    this.utilitySbj = new Subject();
    this.utilityObs = this.utilitySbj.asObservable();

    this.propertySbj = new Subject();
    this.propertyObs = this.propertySbj.asObservable();

    this.courtSbj = new Subject();
    this.courtObs = this.courtSbj.asObservable();

    this.otherSbj = new Subject();
    this.otherObs = this.otherSbj.asObservable();
  }

  ngOnInit() {
    this.contactObs.subscribe(res => {
      this.broadcastChange();
    })
  }

  resetActiveTab() {
    this.activeTab = {
      utilityBilling: false,
      propertyTax: false,
      court: false,
      other: false
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
      case 'utilityBilling':
        this.utilitySbj.next(this.selectedtabName);
        break;
      case 'propertyTax':
        this.propertySbj.next(this.selectedtabName);
        break;
      case 'court':
        this.courtSbj.next(this.selectedtabName);
        break;
      case 'other':
        this.otherSbj.next(this.selectedtabName);
        break;
      default:
        this.resetActiveTab();
        this.activeTab.utilityBilling = true;
        this.selectedtabName = 'utilityBilling'
        break;
    }
  }

}
