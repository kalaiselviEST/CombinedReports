import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'history-vendor',
  templateUrl: './history-vendor.component.html',
  styleUrls: ['./history-vendor.component.css']
})
export class HistoryVendorComponent implements OnInit {
  @Input() changeObs: Observable<any>;
  @Input() sampleTxt: string;
  isLoading = true;
  private subscription: Subscription;
  sampleComArray = Array(12).fill(0).map((x, i) => i);

  constructor() { }

  ngOnInit() {
    this.subscribeToChange();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  subscribeToChange() {
    this.subscription = this.changeObs.subscribe(res => {
      this.sampleComArray = [];
      this.dummyLoad();
    })
  }

  dummyLoad() {
    setTimeout(() => {
      this.isLoading = true;
      this.sampleComArray = Array(12).fill(0).map((x, i) => i);
      this.isLoading = false;
    }, 2000);
  }

}
