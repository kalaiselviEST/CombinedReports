import { Component, OnInit, Output, Input, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'account-select',
  templateUrl: './account-select.component.html',
  styleUrls: ['./account-select.component.css']
})
export class AccountSelectComponent implements OnInit {

  @Input() buttonClass: string;
  @Input() menuClass: string;
  @Input() valid: boolean;
  @Input() resetObs: Observable<any>;
  @Output() accountChange = new EventEmitter();
  @Input() required: boolean;
  isListLoading = true;
  accounts = [];
  selectedAccount;
  @ViewChild('formSearch', { static: false }) searchEle: ElementRef;
  searchKey = "";
  resetId = null;
  listLimit = 50;

  filteredAccounts = [];

  constructor(private accountSvc: AccountService) {
    this.resetAccountType(null);
  }

  ngOnInit() {
    this.fetchAccountTypes();
    this.resetObs.subscribe(id => { this.resetAccountType(id); })
  }

  resetAccountType(id) {
    this.resetId = id;
    if (id) {
      this.selectedAccount = this.accounts.filter(x => x.id == id)[0] || {
        id: null,
        name: '',
        number: null
      };
    }
    else {
      this.selectedAccount = {
        id: null,
        name: '',
        number: null
      }
    }
  }

  fetchAccountTypes() {
    this.isListLoading = true;
    this.accountSvc.fetch('').pipe(
      finalize(() => {
        this.isListLoading = false;
      })
    ).subscribe(res => {
      this.accounts = res.data;
      this.filteredAccounts = this.accounts.slice(0, this.listLimit);
      this.resetAccountType(this.resetId);
    },
      err => {
        console.log(err);
      })
  }

  selectItem(item) {
    this.selectedAccount = item;
    this.accountChange.emit(item);
    this.searchKey = '';
    this.search();
  }

  openChange(isOpen) {
    if (isOpen) {
      setTimeout(() => { this.searchEle.nativeElement.children[0].focus() }, 100);
    } else {
      if (this.selectedAccount.id) {
        this.valid = true;
      } else {
        this.valid = false;
      }
    }
  }

  search() {
    if (this.searchKey.length > 0) {
      this.filteredAccounts = this.accounts.filter(x => x.name.toLowerCase().indexOf(this.searchKey.toLowerCase()) >= 0 || x.number.toLowerCase().indexOf(this.searchKey.toLowerCase()) >= 0);
    }
    else {
      this.filteredAccounts = this.accounts.slice(0, this.listLimit);
    }
  }
}
