import { Component, OnInit, Output, Input, EventEmitter, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ItemService } from 'src/app/_services/item.service';

@Component({
  selector: 'item-select',
  templateUrl: './item-select.component.html',
  styleUrls: ['./item-select.component.css']
})
export class ItemSelectComponent implements OnInit {

  @Input() buttonClass: string;
  @Input() menuClass: string;
  @Input() valid: boolean;
  @Input() resetObs: Observable<any>;
  @Output() itemChange = new EventEmitter();
  @Input() required: boolean;
  @Input() set itemType(value: string) {
    console.log({ value });
    this._itemType = value;
    this.fetchItemTypes();
    this.selectItem(this.selectedItem = {
      id: null,
      name: '',
      number: null
    });

  };
  _itemType = '';
  isListLoading = true;
  items = [];
  selectedItem;
  @ViewChild('formSearch', { static: false }) searchEle: ElementRef;
  searchKey = "";
  resetId = null;
  listLimit = 50;

  filteredItems = [];

  constructor(private itemSvc: ItemService) {
    this.resetItemType(null);
  }

  ngOnInit() {
    this.fetchItemTypes();
    this.resetObs.subscribe(id => { this.resetItemType(id); })
  }

  resetItemType(id) {
    console.log({ reset: id });
    this.resetId = id;
    if (id) {
      this.selectedItem = this.items.filter(x => x.id == id)[0] || {
        id: null,
        name: '',
        number: null
      };
    }
    else {
      this.selectedItem = {
        id: null,
        name: '',
        number: null
      }
    }
  }

  fetchItemTypes() {
    this.isListLoading = true;
    this.itemSvc.fetch(this._itemType).pipe(
      finalize(() => {
        this.isListLoading = false;
      })
    ).subscribe(res => {
      this.items = res.data;
      this.filteredItems = this.items.slice(0, this.listLimit);
      console.log(res.data);
      this.resetItemType(this.resetId);
    },
      err => {
        console.log(err);
      })
  }

  selectItem(item) {
    this.selectedItem = item;
    this.itemChange.emit(item);
    this.searchKey = '';
    this.search();
  }

  openChange(isOpen) {
    if (isOpen) {
      setTimeout(() => { this.searchEle.nativeElement.children[0].focus() }, 100);
    } else {
      if (this.selectedItem.id) {
        this.valid = true;
      } else {
        this.valid = false;
      }
    }
  }

  search() {
    if (this.searchKey.length > 0) {
      this.filteredItems = this.items.filter(x => x.fullName.toLowerCase().indexOf(this.searchKey.toLowerCase()) >= 0);
    }
    else {
      this.filteredItems = this.items.slice(0, this.listLimit);
    }
  }
}
