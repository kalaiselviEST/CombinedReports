import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'employee-compensated-absences',
  templateUrl: './employee-compensated-absences.component.html',
  styleUrls: ['./employee-compensated-absences.component.css']
})
export class EmployeeCompensatedAbsencesComponent implements OnInit {

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
