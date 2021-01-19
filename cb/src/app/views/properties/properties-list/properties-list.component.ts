import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'properties-list',
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.css']
})
export class PropertiesListComponent implements OnInit {

  @Input() mini = false;
  @Output() activeContactChange = new EventEmitter();
  selectedId = 0;

  transactionTypes = [
    { text: 'All', value: 0 },
    { text: 'Customer', value: 1 },
    { text: 'Utility Billing', value: 2 },
    { text: 'Court', value: 3 },
    { text: 'Property Tax', value: 4 },
    { text: 'Vendor', value: 5 },
    { text: 'Employee', value: 6 }
  ];
  isListLoading = true;
  sampleArr = Array(75).fill(0).map((x, i) => i);


  constructor() { }

  ngOnInit() {
    console.log(this.sampleArr);
    this.dummyLoader();
  }

  transactionTypeFilter(item) {
    this.dummyLoader();
    //console.log(item.text);
  }

  dummyLoader() {
    this.isListLoading = true;
    this.sampleArr = []
    setTimeout(() => {
      this.sampleArr = Array(75).fill(0).map((x, i) => i);
      this.isListLoading = false;
      this.contactClicked(0);
    }, 1500);
  }

  contactClicked(data) {
    this.selectedId = data;
    this.activeContactChange.emit(data);
  }

}
