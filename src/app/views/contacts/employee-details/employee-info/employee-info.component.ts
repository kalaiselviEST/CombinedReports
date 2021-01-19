import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.css']
})
export class EmployeeInfoComponent implements OnInit {

  @Input() changeObs: Observable<any>;
  @Input() editable: boolean;
  isLoading = true;
  
  constructor() { }

  ngOnInit() {
    this.dummyLoad();
  }

  dummyLoad() {
    setTimeout(() => {
      this.isLoading = true;
      this.isLoading = false;
    }, 1800);
  }

}
