import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'employee-activities',
  templateUrl: './employee-activities.component.html',
  styleUrls: ['./employee-activities.component.css']
})
export class EmployeeActivitiesComponent implements OnInit {

  @Input() changeObs: Observable<any>;
  @Input() editable: boolean;
  isLoading = true;
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
