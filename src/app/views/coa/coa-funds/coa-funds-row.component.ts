import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { FundService } from 'src/app/_services/fund.service';
import { finalize } from 'rxjs/operators';
import { WorkspaceService } from 'src/app/_services/workspace.service';

@Component({
  selector: 'coa-funds-row',
  templateUrl: './coa-funds-row.component.html'
})
export class CoaFundsRowComponent implements OnInit {
  @Input() parentID = null;
  @Input() isSearch = false;
  @Input() searchObs: Observable<any> = null;
  searchKey = '';
  filteredfunds = [];

  constructor(
    private fundSvc: FundService,
    private ref: ChangeDetectorRef,
    private workspace: WorkspaceService
  ) { }

  ngOnInit() {
    //this.filteredfunds = this.fundSvc.funds.filter(x => x.parentID == this.parentID);
    this.filterFunds('');
    if (this.searchObs != null) {
      this.searchObs.subscribe(s => {
        this.searchKey = s;
        this.filterFunds(s);
      })
    }
  }

  filterFunds(searchKey) {
    if (searchKey.trim() != '') {
      this.filteredfunds = this.fundSvc.funds.filter(x => x.number.toString().toLowerCase().indexOf(searchKey) > -1 || x.name.toLowerCase().indexOf(searchKey) > -1 || x.description.toLowerCase().indexOf(searchKey) > -1);
      this.isSearch = true;
    } else {
      this.isSearch = false;
      this.filteredfunds = this.fundSvc.funds.filter(x => x.parentID == this.parentID);
    }

  }

  toggleActive(fund) {
    fund.isActive = !fund.isActive;
    fund.isLoading = true;
    this.fundSvc.toggleActive(fund.id, fund.isActive).pipe(
      finalize(() => {
        fund.isLoading = false;
        this.ref.detectChanges();
      })
    ).subscribe(res => {
      //200 denotes it was successfull
      fund.isLoading = false;

      if (res.statusCode != 200) {
        //revert back if failed
        fund.isActive = !fund.isActive;
      }

      if (res.statusCode == 422) {
        this.workspace.warningToast({
          message: 'Fund has active children'
        })
      }
    },
      err => {
        //revert back if failed
        fund.isActive = !fund.isActive;
        fund.isLoading = false;
      })
  }

  deleteConfirm(fund) {
    fund.isDeleting = true;
  }

  deleteFund(fund, i) {
    fund.isLoading = true;
    this.fundSvc.delete(fund.id).pipe(
      finalize(() => {
        fund.isLoading = false;
        fund.isDeleting = false;
      })
    ).subscribe(res => {

      if (res.statusCode == 422) {
        this.workspace.warningToast({
          message: 'Fund has children'
        })
      }

      //200 denotes it was successfull
      if (res.statusCode == 200) {
        this.filteredfunds.splice(i, 1);
      }
    },
      err => {
        fund.isLoading = false;
      })
  }
}
