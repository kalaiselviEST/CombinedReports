import { Component, OnInit, Output, Input, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UtilityBillingService } from 'src/app/_services/utility-billing.service';

@Component({
  selector: 'ub-service-type-select',
  templateUrl: './ub-service-type-select.component.html',
  styleUrls: ['./ub-service-type-select.component.css']
})
export class UbServiceTypeSelectComponent implements OnInit {

  @Input() buttonClass: string;
  @Input() menuClass: string;
  @Input() valid: boolean;
  @Input() resetObs: Observable<any>;
  @Output() utilityBillingTypeChange = new EventEmitter();
  isListLoading = true;
  utilityBillingTypes = [];
  selectedUbServiceType;
  @ViewChild('formSearch', { static: false }) searchEle: ElementRef;
  searchKey = "";
  resetId = null;
  listLimit = 50;

  filteredUbServiceTypes = [];

  constructor(private utilityBillingSvc: UtilityBillingService) {
    this.resetUbServiceType(null);
  }

  ngOnInit() {
    this.fetchUbServiceTypes();
    this.resetObs.subscribe(id => { this.resetUbServiceType(id); })
  }

  resetUbServiceType(id) {
    this.resetId = id;
    if (id) {
      this.selectedUbServiceType = this.utilityBillingTypes.filter(x => x.id == id)[0] || {
        id: null,
        name: '',
        number: null
      };
    }
    else {
      this.selectedUbServiceType = {
        id: null,
        name: '',
        number: null
      }
    }
  }

  fetchUbServiceTypes() {
    this.isListLoading = true;
    this.utilityBillingSvc.fetchServiceTypes().pipe(
      finalize(() => {
        this.isListLoading = false;
      })
    ).subscribe(res => {
      this.utilityBillingTypes = res.data;
      this.filteredUbServiceTypes = this.utilityBillingTypes.slice(0, this.listLimit);
      this.resetUbServiceType(this.resetId);
    },
      err => {
        console.log(err);
      })
  }

  selectItem(utilityBilling) {
    this.selectedUbServiceType = utilityBilling;
    this.utilityBillingTypeChange.emit(utilityBilling);
    this.searchKey = '';
    this.search();
  }

  openChange(isOpen) {
    if (isOpen) {
      setTimeout(() => { this.searchEle.nativeElement.children[0].focus() }, 100);
    } else {
      if (this.selectedUbServiceType.id) {
        this.valid = true;
      } else {
        this.valid = false;
      }
    }
  }

  search() {
    if (this.searchKey.length > 0) {
      this.filteredUbServiceTypes = this.utilityBillingTypes.filter(x => x.name.toLowerCase().indexOf(this.searchKey.toLowerCase()) >= 0 || x.number.toLowerCase().indexOf(this.searchKey.toLowerCase()) >= 0);
    }
    else {
      this.filteredUbServiceTypes = this.utilityBillingTypes.slice(0, this.listLimit);
    }
  }
}
