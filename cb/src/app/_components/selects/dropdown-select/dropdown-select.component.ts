import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

interface DropdownItem {
  value: any,
  text: any
}

@Component({
  selector: 'dropdown-select',
  templateUrl: './dropdown-select.component.html',
  styleUrls: ['./dropdown-select.component.css']
})
export class DropdownSelectComponent implements OnInit {

  selectedItem: DropdownItem;
  private _dropdownItems: DropdownItem[];
  @Input() buttonClass: string;
  @Input() menuClass: string;
  @Input() set dropdownItems(value: DropdownItem[]) {
    this._dropdownItems = value;
    this.selectedItem = this._dropdownItems[0];
  }
  get dropdownItems() {
    return this._dropdownItems;
  }
  @Input() dropdownLabel: string;
  @Output() itemChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log(this.dropdownItems);
    this.selectedItem = this.dropdownItems[0];
  }

  selectItem(item: DropdownItem) {
    this.selectedItem = item;
    this.itemChange.emit(item);
  }
}
