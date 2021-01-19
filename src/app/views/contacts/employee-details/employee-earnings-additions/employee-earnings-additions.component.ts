import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'employee-earnings-additions',
  templateUrl: './employee-earnings-additions.component.html',
  styleUrls: ['./employee-earnings-additions.component.css']
})
export class EmployeeEarningsAdditionsComponent implements OnInit {

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
