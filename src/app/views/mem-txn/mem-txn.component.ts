import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mem-txn',
  templateUrl: './mem-txn.component.html',
  styleUrls: ['./mem-txn.component.css']
})
export class MemTxnComponent implements OnInit {

  transactionTypes = [
    { text: 'All', value: 0 },
    { text: 'Bill', value: 1 },
    { text: 'Bill Credit', value: 2 },
    { text: 'Payment', value: 3 },
    { text: 'Deposit', value: 4 },
    { text: 'Payroll Check', value: 5 },
    { text: 'Sales', value: 6 }
  ];
  isListLoading = true;
  sampleArr = Array(25).fill(0).map((x, i) => i);


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
      this.sampleArr = Array(25).fill(0).map((x, i) => i);
      this.isListLoading = false;
    }, 2000);
  }
}
