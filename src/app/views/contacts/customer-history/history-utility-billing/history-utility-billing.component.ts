import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'history-utility-billing',
  templateUrl: './history-utility-billing.component.html',
  styleUrls: ['./history-utility-billing.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class HistoryUtilityBillingComponent implements OnInit, OnDestroy {

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
    }, 1800);
  }
}
