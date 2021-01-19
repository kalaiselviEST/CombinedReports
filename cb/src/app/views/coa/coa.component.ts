import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'coa',
  templateUrl: './coa.component.html',
  styleUrls: ['./coa.component.css']
})
export class CoaComponent implements OnInit {

  changeSbj: Subject<any>;
  changeObs: Observable<any>;

  fundsSbj: Subject<any>;
  fundsObs: Observable<any>;

  accountsSbj: Subject<any>;
  accountsObs: Observable<any>;

  groupsSbj: Subject<any>;
  groupsObs: Observable<any>;

  isLoading = true;
  isCollapsed = false;
  isRotate = false;

  selectedtabName = 'funds';
  activeTab = {
    funds: true,
    departments: false,
    accounts: false,
    groups: false
  }

  constructor(
    private router: Router
  ) {
    this.changeSbj = new Subject();
    this.changeObs = this.changeSbj.asObservable();

    this.fundsSbj = new Subject();
    this.fundsObs = this.fundsSbj.asObservable();

    this.accountsSbj = new Subject();
    this.accountsObs = this.accountsSbj.asObservable();

    this.groupsSbj = new Subject();
    this.groupsObs = this.groupsSbj.asObservable();
  }

  ngOnInit() {
    this.broadcastChange();
    this.resetActiveTab();
    if (this.router.url.toLowerCase().indexOf('account') > -1) {
      //Activate accounts tab

      this.activeTab['accounts'] = true;
      this.selectedtabName = 'accounts';
    } else if (this.router.url.toLowerCase().indexOf('department') > -1) {

      this.activeTab['departments'] = true;
      this.selectedtabName = 'departments';
    } else if (this.router.url.toLowerCase().indexOf('fund') > -1) {

      this.activeTab['funds'] = true;
      this.selectedtabName = 'funds';
    } else if (this.router.url.toLowerCase().indexOf('group') > -1) {

      this.activeTab['groups'] = true;
      this.selectedtabName = 'groups';
    }
  }

  resetActiveTab() {
    this.activeTab = {
      funds: false,
      departments: false,
      accounts: false,
      groups: false
    }
  }

  selectTab(tabName) {
    this.resetActiveTab();
    this.activeTab[tabName] = true;
    this.selectedtabName = tabName;

    this.router.navigate([`/coa/${tabName}`]);
  }

  broadcastChange() {
    switch (this.selectedtabName) {
      case 'funds':
        this.fundsSbj.next(this.selectedtabName);
        break;
      case 'accounts':
        this.accountsSbj.next(this.selectedtabName);
        break;
      case 'groups':
        this.groupsSbj.next(this.selectedtabName);
        break;
      default:
        this.resetActiveTab();
        this.activeTab.funds = true;
        this.selectedtabName = 'funds'
        break;
    }
  }

}
