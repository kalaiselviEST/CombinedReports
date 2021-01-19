import { Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AccountService } from 'src/app/_services/account.service';
import { finalize } from 'rxjs/operators';
import { WorkspaceService } from 'src/app/_services/workspace.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'coa-accounts',
  templateUrl: './coa-accounts.component.html',
  styleUrls: ['./coa-accounts.component.css']
})
export class CoaAccountsComponent implements OnInit {

  @ViewChild('tbody', { static: false }) private tbody: ElementRef;
  newAccUrl = "./new";
  isListLoading = true;
  accounts = [];
  accountTypes = [];
  boxW2 = [];
  selectedAccountType = {
    id: '',
    name: 'All',
    text: 'All'
  };
  accountsTree = [];
  treeIteration = 0;
  ajaxDetector = null;
  accProgressDetector = null;
  prevAjaxId = null;
  currAjaxId = null;
  internalLoading = true;
  fetchingFirsttime = true;
  showInactive = false;

  searchKey = '';
  searchSbj = new Subject<any>();
  searchTimeout = null;
  searchLoading = false;

  constructor(
    public accountSvc: AccountService,
    private workspace: WorkspaceService,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.fetchAccountTypes();
    this.fetchAccounts();
    this.accountSvc.accountObs.subscribe(() => {
      this.fetchAccounts();
    })
  }

  fetchAccounts() {
    this.isListLoading = true;
    this.internalLoading = true;
    this.detectAjaxProgress();
    this.accountSvc.fetch(this.selectedAccountType.id, this.showInactive).pipe(
      finalize(() => {
        this.isListLoading = false;
      })
    ).subscribe(res => {
      this.treeIteration = 0;
      this.accountSvc.accounts = res.data;
      if (this.fetchingFirsttime) {
        var typeIDs = this.accountSvc.accounts.filter(x => !x.parentID).map(x => x.typeID);
        //this.accountTypes = this.accountTypes.filter(x => typeIDs.indexOf(x.id) > -1 || x.id == '');
        this.fetchingFirsttime = false;
      }
    },
      err => {
        console.log(err);
      })
  }

  fetchAccountTypes() {
    this.accountSvc.fetchTypes().pipe(
      finalize(() => {

      })
    ).subscribe(res => {
      this.accountTypes = res.data;
      this.accountTypes.map(x => x.text = x.name);
      this.accountTypes.unshift({
        id: '',
        name: '     All',
        text: 'All'
      });

    },
      err => {
        console.log(err);
      })
  }

  fetchAccountboxW2() {
    this.accountSvc.fetchBoxW2().pipe(
      finalize(() => {

      })
    ).subscribe(res => {
      this.boxW2 = res.data;
    },
      err => {
        console.log(err);
      })
  }

  getTypeName(id) {
    var type = this.accountTypes.filter(x => x.id == id);
    return type[0].name || '';
  }

  getBoxW2Number(id) {
    var w2 = this.boxW2.filter(x => x.id == id);
    if (w2[0])
      return w2[0].number || '';
    else
      return '';
  }

  selectAccountType(type) {
    this.selectedAccountType = type;
    this.fetchAccounts();
  }

  stripColorRows() {
    setTimeout(() => {
      if (!this.tbody) return;
      var rows = this.tbody.nativeElement.querySelectorAll('.table-row');
      for (var i = 0; i < rows.length; i++) {
        if (i % 2 == 0)
          rows[i].classList.add('even');
        else
          rows[i].classList.remove('even');
      }
    }, 100);
  }

  detectAjaxProgress() {
    this.ajaxDetector = setInterval(() => {
      if (this.accountSvc.currentID == this.prevAjaxId) {
        this.internalLoading = false;
        clearInterval(this.ajaxDetector);
        this.stripColorRows();
      }
      this.prevAjaxId = this.accountSvc.currentID;
    }, 2000);

    this.accProgressDetector = setInterval(() => {
      if (!this.internalLoading) {
        clearInterval(this.accProgressDetector);
      }

      this.currAjaxId = this.accountSvc.currentID;
    }, 200);


  }

  getName(accId) {
    var acc = this.accountSvc.accounts.filter(x => x.id == accId)[0]
    if (acc) {
      return "Loading: " + acc.name.substring(0, 10) + "...";
    } else {
      return "Loading...";
    }
  }

  sendSearch() {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.searchSbj.next(this.searchKey);
      this.searchLoading = true;
      setTimeout(() => {
        this.searchLoading = false;
      }, 1000);
    }, 1000);
  }

  clearFilters() {
    this.searchKey = '';
    this.searchSbj.next('');
    this.showInactive = false;
    this.fetchAccountTypes();
    this.fetchAccounts();
  }
}
