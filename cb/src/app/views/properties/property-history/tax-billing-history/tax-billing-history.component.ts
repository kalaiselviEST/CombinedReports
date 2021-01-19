import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'tax-billing-history',
  templateUrl: './tax-billing-history.component.html',
  styleUrls: ['./tax-billing-history.component.css']
})
export class TaxBillingHistoryComponent implements OnInit {

  @Input() changeObs: Observable<any>;
  @Input() sampleTxt: string;
  isLoading = true;
  private subscription: Subscription;
  sampleComArray = Array(30).fill(0).map((x, i) => i);

  constructor() { }

  ngOnInit() {
    this.dummyLoad();
  }
  
  dummyLoad() {
    setTimeout(() => {
      this.isLoading = true;
      this.sampleComArray = Array(30).fill(0).map((x, i) => i);
      this.isLoading = false;
    }, 2000);
  }
}
