
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FundService } from 'src/app/_services/fund.service';
import { finalize } from 'rxjs/operators';
import { WorkspaceService } from 'src/app/_services/workspace.service';
declare var $: any; //for jQuery usage

@Component({
  selector: 'coa-funds',
  templateUrl: './coa-funds.component.html',
  styleUrls: ['./coa-funds.component.css']
})
export class CoaFundsComponent implements OnInit {

  newFundUrl = "./new";
  isListLoading = true;
  funds = [];
  @ViewChild('tbody', { static: false }) private tbody: ElementRef;
  showInactive = false;
  searchKey = '';
  searchSbj = new Subject<any>();
  searchTimeout = null;
  searchLoading = false;

  constructor(
    public fundSvc: FundService,
    private workspace: WorkspaceService
  ) { }

  ngOnInit() {
    this.fetchFunds();
    this.fundSvc.fundObs.subscribe(() => {
      this.fetchFunds();
    });
  }

  fetchFunds() {
    this.isListLoading = true;
    this.fundSvc.fetch(this.showInactive).pipe(
      finalize(() => {
        this.isListLoading = false;
      })
    ).subscribe(res => {
      this.fundSvc.funds = res.data;
      this.stripColorRows();

    },
      err => {
        console.log(err);
      })
  }

  stripColorRows() {
    setTimeout(() => {
      var rows = this.tbody.nativeElement.querySelectorAll('.table-row');
      for (var i = 0; i < rows.length; i++) {
        if (i % 2 == 0)
          rows[i].classList.add('even');
        else
          rows[i].classList.remove('even');
      }
    }, 100);
  }

  jQueryCheck(ele) {
    alert(ele);
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

  clearFilters(){
    this.searchKey = '';
    this.searchSbj.next('');
    this.showInactive = false;
    this.fetchFunds();
  }
}
