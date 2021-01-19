import { Component, OnInit, Output, Input, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'payable-to-select',
  templateUrl: './payable-to-select.component.html',
  styleUrls: ['./payable-to-select.component.css']
})
export class PayableToSelectComponent implements OnInit {

  @Input() buttonClass: string;
  @Input() menuClass: string;
  @Input() valid: boolean;
  @Input() resetObs: Observable<any>;
  @Output() payableToChange = new EventEmitter();
  @Input() required = false;
  isListLoading = true;
  payableTos = [];
  @Input() selectedPayableTo;
  @ViewChild('formSearch', { static: false }) searchEle: ElementRef;
  searchKey = "";
  resetId = null;

  filteredPayableTos = [];

  constructor(private accountSvc: AccountService) {
    this.resetBox(null);
  }

  ngOnInit() {
    this.fetchPayableTos();
    this.resetObs.subscribe((id) => { this.resetBox(id); })
  }

  resetBox(id) {
    this.resetId = id;
    if (id) {
      this.selectedPayableTo = this.payableTos.filter(x => x.id == id)[0] || {
        id: null,
        name: ''
      };
    }
    else {
      this.selectedPayableTo = {
        id: null,
        name: ''
      };
    }

  }

  fetchPayableTos() {

    this.payableTos = [{
      id: 'fica',
      name: 'United States Treasury'
    }, {
      id: 'state',
      name: 'Department of Revenue & Finance'
    }, {
      id: 'ipers',
      name: 'IPERS'
    }];
    // this.payableTos.map(x => x.description = x.description.length > 30 ? `${x.description.slice(0, 30)}...` : x.description);
    this.filteredPayableTos = this.payableTos.slice(0, 50);
  }

  selectItem(item) {
    this.selectedPayableTo = item;
    this.payableToChange.emit(item);
    this.searchKey = '';
    this.search();
  }

  openChange(isOpen) {
    if (isOpen) {
      setTimeout(() => { this.searchEle.nativeElement.children[0].focus() }, 100);
    } else {
      return;
      if (this.selectedPayableTo.id) {
        this.valid = true;
      } else {
        this.valid = false;
      }
    }
  }

  search() {
    if (this.searchKey.length > 0) {
      this.filteredPayableTos = this.payableTos.filter(x => x.name.toLowerCase().indexOf(this.searchKey.toLowerCase()) >= 0);
    }
    else {
      this.filteredPayableTos = this.payableTos.slice(0, 10);
    }
  }
}
