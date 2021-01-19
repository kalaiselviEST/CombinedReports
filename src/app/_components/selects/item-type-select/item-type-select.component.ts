import { Component, OnInit, Output, Input, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ItemService } from 'src/app/_services/item.service';

@Component({
  selector: 'item-type-select',
  templateUrl: './item-type-select.component.html',
  styleUrls: ['./item-type-select.component.css']
})
export class ItemTypeSelectComponent implements OnInit {

  @Input() buttonClass: string;
  @Input() menuClass: string;
  @Input() valid: boolean;
  @Input() resetObs: Observable<any>;
  @Output() itemTypeChange = new EventEmitter();
  @Input() required: boolean;
  isListLoading = true;
  itemTypes = [];
  selectedItemType;
  @ViewChild('formSearch', { static: false }) searchEle: ElementRef;
  searchKey = "";
  resetId = null;
  listLimit = 50;
  fieldRequired;

  filteredItemTypes = [];

  constructor(private itemSvc: ItemService) {
    this.resetItemType(null);
  }

  ngOnInit() {
    this.fetchItemTypes();
    this.resetObs.subscribe(id => { this.resetItemType(id); });

  }

  resetItemType(id) {
    this.resetId = id;
    if (id) {
      this.selectedItemType = this.itemTypes.filter(x => x.id == id)[0] || {
        id: null,
        name: '',
        number: null
      };
    }
    else {
      this.selectedItemType = {
        id: null,
        name: '',
        number: null
      }
    }
  }

  fetchItemTypes() {
    this.isListLoading = true;
    this.itemSvc.fetchTypes().pipe(
      finalize(() => {
        this.isListLoading = false;
      })
    ).subscribe(res => {
      console.log(res.data);
      this.itemTypes = res.data;//.filter(x=> x.parentID)
      console.log(this.itemTypes);
      this.filteredItemTypes = this.itemTypes.slice(0, this.listLimit);
      this.resetItemType(this.resetId);
    },
      err => {
        console.log(err);
      })
  }

  selectItem(item) {
    this.selectedItemType = item;
    this.itemTypeChange.emit(item);
    this.searchKey = '';
    this.search();
  }

  clearSelection() {
    this.selectedItemType = {
      id: null,
      name: '',
      number: null
    };
    this.itemTypeChange.emit(this.selectedItemType);
    this.valid = false;
    this.searchKey = '';
    this.search();
  }

  openChange(isOpen) {
    if (isOpen) {
      setTimeout(() => { this.searchEle.nativeElement.children[0].focus() }, 100);
    } else {
      if (this.selectedItemType.id) {
        this.valid = true;
      } else {
        this.valid = false;
      }
    }
  }

  search() {
    if (this.searchKey.length > 0) {
      this.filteredItemTypes = this.itemTypes.filter(x => x.name.toLowerCase().indexOf(this.searchKey.toLowerCase()) >= 0);
    }
    else {
      this.filteredItemTypes = this.itemTypes.slice(0, this.listLimit);
    }
  }
}
