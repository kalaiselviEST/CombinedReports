import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'history-property-tax',
  templateUrl: './history-property-tax.component.html',
  styleUrls: ['./history-property-tax.component.css']
})
export class HistoryPropertyTaxComponent implements OnInit {
  @Input() changeObs: Observable<any>;
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
    }, 1800);
  }
}
