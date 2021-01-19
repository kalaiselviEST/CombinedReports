import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'vendor-employee-history',
  templateUrl: './vendor-employee-history.component.html',
  styleUrls: ['./vendor-employee-history.component.css'],
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
export class VendorEmployeeHistoryComponent implements OnInit {

  @Input() contactObs: Observable<any>;
  changeSbj: Subject<any>;
  changeObs: Observable<any>;

  vendorSbj: Subject<any>;
  vendorObs: Observable<any>;

  employeeSbj: Subject<any>;
  employeeObs: Observable<any>;

  isLoading = true;
  isCollapsed = false;
  isRotate = false;

  selectedtabName = 'vendor';
  activeTab = {
    vendor: true,
    employee: false,
  }

  constructor() {
    this.changeSbj = new Subject();
    this.changeObs = this.changeSbj.asObservable();

    this.vendorSbj = new Subject();
    this.vendorObs = this.vendorSbj.asObservable();

    this.employeeSbj = new Subject();
    this.employeeObs = this.employeeSbj.asObservable();
  }

  ngOnInit() {
    this.contactObs.subscribe(res => {
      this.broadcastChange();
    })
  }

  resetActiveTab() {
    this.activeTab = {
      vendor: false,
      employee: false,
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
      case 'vendor':
        this.vendorSbj.next(this.selectedtabName);
        break;
      case 'employee':
        this.employeeSbj.next(this.selectedtabName);
        break;
      default:
        this.resetActiveTab();
        this.activeTab.vendor = true;
        this.selectedtabName = 'vendor'
        break;
    }
  }

}
