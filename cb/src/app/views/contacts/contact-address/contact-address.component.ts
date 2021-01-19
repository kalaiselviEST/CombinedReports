import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'contact-addresses',
  templateUrl: './contact-address.component.html',
  styleUrls: ['./contact-address.component.css'],
  animations: [
    trigger('smoothCollapse', [
      state('initial', style({
        height:'0',
        overflow:'hidden'
      })),
      state('final', style({
        overflow:'hidden'
      })),
      transition('initial=>final', animate('300ms')),
      transition('final=>initial', animate('300ms'))
    ]),
    trigger('smoothRotate', [
      state('initial', style({
        transform: 'rotate(-90deg)'
      })),
      state('final', style({
        transform: 'rotate(0deg)'
      })),
      transition('initial=>final', animate('0.3s')),
      transition('final=>initial', animate('0.3s'))
    ])
  ]
})

export class ContactAddressComponent implements OnInit {

  isCollapsed = false;
  isRotate = false;
  @Input() contactObs: Observable<any>;
  @Input() editable: boolean;
  isLoading = false;  
  commShowInactive = false;
  sampleComArray = Array(2).fill(0).map((x, i) => i);

  constructor() { }

  ngOnInit() {
    this.subscribeToContactChange();
  }

  subscribeToContactChange() {
    this.contactObs.subscribe(res => {
      this.isLoading = true;
      this.dummyLoad();
    })
  }

  dummyLoad() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  dummyCommActiveToggle() {
    this.sampleComArray = []

    if (this.commShowInactive) {
      this.sampleComArray = Array(7).fill(0).map((x, i) => i);
    }
    else {
      this.sampleComArray = Array(2).fill(0).map((x, i) => i);
    }
  }

  tableScrolled(e){
    console.log(e);
  }

}
