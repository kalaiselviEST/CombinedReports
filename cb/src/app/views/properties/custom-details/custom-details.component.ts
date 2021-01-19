import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'custom-details',
  templateUrl: './custom-details.component.html',
  styleUrls: ['./custom-details.component.css']
})
export class CustomDetailsComponent implements OnInit {

  isListLoading = true;
  sampleArr = Array(75).fill(0).map((x, i) => i);

  constructor() { }

  ngOnInit() {
    this.dummyLoader();
  }

  dummyLoader() {
    this.isListLoading = true;
    this.sampleArr = []
    setTimeout(() => {
      this.sampleArr = Array(75).fill(0).map((x, i) => i);
      this.isListLoading = false;
      
    }, 2000);
  }

}
