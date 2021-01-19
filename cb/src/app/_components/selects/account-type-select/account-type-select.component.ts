import { Component, OnInit, Output, Input, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'account-type-select',
  templateUrl: './account-type-select.component.html',
  styleUrls: ['./account-type-select.component.css']
})
export class AccountTypeSelectComponent implements OnInit {

  @Input() disabled: boolean
  @Input() buttonClass: string;
  @Input() menuClass: string;
  @Input() valid: boolean;
  @Input() resetObs: Observable<any>;
  @Output() typeChange = new EventEmitter();
  isListLoading = true;
  accountTypes = [];
  selectedType;
  @ViewChild('formSearch', { static: false }) searchEle: ElementRef;
  searchKey = "";
  resetId = null;

  filteredTypes = [];

  constructor(private accountSvc: AccountService) {
    this.resetAccountType(null);
  }

  ngOnInit() {
    this.fetchAccountTypes();
    this.resetObs.subscribe((id) => { this.resetAccountType(id); })
  }

  resetAccountType(id) {
    this.resetId = id;
    if (id) {
      this.resetId == id;
      this.selectedType = this.accountTypes.filter(x => x.id == id)[0] || {
        id: null,
        name: '',
        number: null
      };
    }
    else {
      this.selectedType = {
        id: null,
        name: '',
        number: null
      }
    }
  }

  fetchAccountTypes() {
    this.isListLoading = true;
    this.accountSvc.fetchTypes().pipe(
      finalize(() => {
        this.isListLoading = false;
      })
    ).subscribe(res => {
      this.accountTypes = res.data;
      this.filteredTypes = this.accountTypes.slice(0, 50);

      this.resetAccountType(this.resetId);
    },
      err => {
        console.log(err);
      })
  }

  selectItem(item) {
    this.selectedType = item;
    this.typeChange.emit(item);
    this.searchKey = '';
    this.search();
  }

  openChange(isOpen) {
    if (isOpen) {
      setTimeout(() => { this.searchEle.nativeElement.children[0].focus() }, 100);
    } else {
      if (this.selectedType.id) {
        this.valid = true;
      } else {
        this.valid = false;
      }
    }
  }

  search() {
    if (this.searchKey.length > 0) {
      this.filteredTypes = this.accountTypes.filter(x => x.name.toLowerCase().indexOf(this.searchKey.toLowerCase()) >= 0 || x.number.toLowerCase().indexOf(this.searchKey.toLowerCase()) >= 0);
    }
    else {
      this.filteredTypes = this.accountTypes.slice(0, 10);
    }
  }
}
