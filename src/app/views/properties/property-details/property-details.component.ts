import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {

  customizeUrl = "./customize";
  editable = false;

  constructor() { }

  ngOnInit() {
  }

}
