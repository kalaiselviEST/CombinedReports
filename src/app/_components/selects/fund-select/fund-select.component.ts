import { Component, OnInit, Output, Input, EventEmitter, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FundService } from 'src/app/_services/fund.service';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'fund-select',
  templateUrl: './fund-select.component.html',
  styleUrls: ['./fund-select.component.css']
})
export class FundSelectComponent implements OnInit {

  @Input() buttonClass: string;
  @Input() menuClass: string;
  @Input() valid: boolean;
  @Input() resetObs: Observable<any>;
  @Output() fundChange = new EventEmitter();
  @Input() required: boolean;
  isListLoading = true;
  funds = [];
  selectedFund;
  @ViewChild('formSearch', { static: false }) searchEle: ElementRef;
  searchKey = "";
  resetId = null;
  listLimit = 50

  filteredFunds = [];

  constructor(private fundSvc: FundService, private changeDetector: ChangeDetectorRef) {
    this.resetFund(null);
  }

  ngOnInit() {
    this.fetchFunds();
    this.resetObs.subscribe(id => { this.resetFund(id); })
  }

  resetFund(id) {
    this.resetId = id;
    if (id) {
      var sel = this.funds.filter(x => x.id == id);
      if (sel.length > 0) {
        this.selectedFund = sel[0];
        return;
      }
    }

    this.selectedFund = {
      id: null,
      name: '',
      number: null
    }
  }

  fetchFunds() {
    this.isListLoading = true;
    this.fundSvc.fetch().pipe(
      finalize(() => {
        this.isListLoading = false;
      })
    ).subscribe(res => {
      this.funds = res.data;
      this.filteredFunds = this.funds.slice(0, this.listLimit);
      this.resetFund(this.resetId);
    },
      err => {
        console.log(err);
      })
  }

  selectItem(item) {
    this.selectedFund = item;
    this.fundChange.emit(item);
    this.searchKey = '';
    this.search();
  }

  openChange(isOpen) {
    if (isOpen) {
      setTimeout(() => { this.searchEle.nativeElement.children[0].focus() }, 100);
    } else {
      if (this.selectedFund.id) {
        this.valid = true;
      } else {
        this.valid = false;
      }
    }
  }

  search() {
    if (this.searchKey.length > 0) {
      this.filteredFunds = this.funds.filter(x => x.name.toLowerCase().indexOf(this.searchKey.toLowerCase()) >= 0 || x.number.toLowerCase().indexOf(this.searchKey.toLowerCase()) >= 0);
    }
    else {
      this.filteredFunds = this.funds.slice(0, this.listLimit);
    }
  }
}
