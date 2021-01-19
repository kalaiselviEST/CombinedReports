import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'employee-taxes-benefits',
  templateUrl: './employee-taxes-benefits.component.html',
  styleUrls: ['./employee-taxes-benefits.component.css']
})
export class EmployeeTaxesBenefitsComponent implements OnInit {

  @Input() changeObs: Observable<any>;
  @Input() editable: boolean;
  isLoading = true;
  commShowInactive = false;
  sampleComArray = Array(12).fill(0).map((x, i) => i);

  constructor() { }

  ngOnInit() {
    this.dummyLoad();
  }

  dummyLoad() {
    setTimeout(() => {
      this.isLoading = true;
      this.sampleComArray = Array(12).fill(0).map((x, i) => i);
      this.isLoading = false;
    }, 1800);
  }

}
