import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, NgZone, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/_services/account.service';
import { finalize } from 'rxjs/operators';
import { WorkspaceService } from 'src/app/_services/workspace.service';

@Component({
  selector: 'coa-accounts-row',
  templateUrl: './coa-accounts-row.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoaAccountsRowComponent implements OnInit {
  @Input() parentID = null;
  @Input() isSearch = false;
  @Input() searchObs: Observable<any> = null;
  searchKey = '';
  filteredAccounts = [];

  constructor(
    public accountSvc: AccountService,
    private ref: ChangeDetectorRef,
    private workspace: WorkspaceService
  ) { }

  ngOnInit() {
    this.filterAccounts('');
    if (this.searchObs != null) {
      this.searchObs.subscribe(s => {
        this.searchKey = s;
        this.filterAccounts(s);
      })
    }
  }

  filterAccounts(searchKey) {
    if (searchKey.trim() != '') {
      this.filteredAccounts = this.accountSvc.accounts.filter(x => x.number.toString().toLowerCase().indexOf(searchKey) > -1 || x.name.toLowerCase().indexOf(searchKey) > -1 || x.description.toLowerCase().indexOf(searchKey) > -1);
      this.isSearch = true;
    } else {
      this.isSearch = false;
      if (this.parentID) {
        //Use setTimeout so Angular has gaps in between to keep the UI un-frozen
        setTimeout(() => {
          this.accountSvc.currentID = this.parentID;
          this.filteredAccounts = this.accountSvc.accounts.filter(x => x.parentID == this.parentID);
          this.ref.detectChanges();
        }, 100);

      } else {
        this.isSearch = false;
        this.filteredAccounts = this.accountSvc.accounts.filter(x => x.parentID == this.parentID);
      }
    }


  }

  toggleActive(account) {
    account.isActive = !account.isActive;
    account.isLoading = true;
    this.accountSvc.toggleActive(account.id, account.isActive).pipe(
      finalize(() => {
        account.isLoading = false;
        this.ref.detectChanges();
      })
    ).subscribe(res => {
      //200 means it was successfull
      account.isLoading = false;
      if (res.statusCode != 200) {
        account.isActive = !account.isActive;
      }

      if (res.statusCode == 422) {
        this.workspace.warningToast({
          message: 'Account has active children'
        })
      }
    },
      err => {
        //revert back if failed
        account.isActive = !account.isActive;
        account.isLoading = false;
      })
  }

  deleteConfirm(acc) {
    acc.isDeleting = true;
  }
  
  deleteAccount(acc, i) {
    acc.isLoading = true;
    this.accountSvc.delete(acc.id).pipe(
      finalize(() => {
        acc.isLoading = false;
        acc.isDeleting = false;
      })
    ).subscribe(res => {

      if (res.statusCode == 422) {
        this.workspace.warningToast({
          message: 'Account has children'
        })
      }

      //200 denotes it was successfull
      if (res.statusCode == 200) {
        this.filteredAccounts.splice(i, 1);
      }
    },
      err => {
        acc.isLoading = false;
      })
  }
}
