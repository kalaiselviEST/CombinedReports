import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dot-loader',
  templateUrl: './dot-loader.component.html',
  styleUrls: ['./dot-loader.component.css']
})
export class DotLoaderComponent implements OnInit {

  private _loadingText = 'Loading';
  @Input() overlay = false;

  get loadingText(): string {
    return this._loadingText;
  }

  @Input('loadingText')
  set loadingText(value: string) { // Use this to perform any action when loading text changes
    this._loadingText = value;
  }

  // @Output() capture = new EventEmitter();

  constructor() {
    this.loadingText = 'Loading';
  }

  ngOnInit() {
  }

}
