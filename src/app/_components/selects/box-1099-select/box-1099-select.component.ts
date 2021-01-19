import { Component, OnInit, Output, Input, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'box-1099-select',
  templateUrl: './box-1099-select.component.html',
  styleUrls: ['./box-1099-select.component.css']
})
export class Box1099SelectComponent implements OnInit {

  @Input() buttonClass: string;
  @Input() menuClass: string;
  @Input() valid: boolean;
  @Input() resetObs: Observable<any>;
  @Output() boxChange = new EventEmitter();
  isListLoading = true;
  boxes = [];
  selectedBox;
  @ViewChild('formSearch', { static: false }) searchEle: ElementRef;
  searchKey = "";
  resetId = null;

  filteredBoxes = [];

  constructor(private accountSvc: AccountService) {
    this.resetBox(null);
  }

  ngOnInit() {
    this.fetchBoxes();
    this.resetObs.subscribe((id) => { this.resetBox(id); })
  }

  resetBox(id) {
    this.resetId = id;
    if (id) {
      this.selectedBox = this.boxes.filter(x => x.id == id)[0] || {
        id: null,
        name: '',
        number: null
      };
    }
    else {
      this.selectedBox = {
        id: null,
        name: '',
        number: null
      }
    }

  }

  fetchBoxes() {
    this.isListLoading = true;
    this.accountSvc.fetchBox1099().pipe(
      finalize(() => {
        this.isListLoading = false;
      })
    ).subscribe(res => {
      this.boxes = res.data;
      this.filteredBoxes = this.boxes.slice(0, 50);
      this.resetBox(this.resetId);
    },
      err => {
        console.log(err);
      })
  }

  selectItem(item) {
    this.selectedBox = item;
    this.boxChange.emit(item);
    this.searchKey = '';
    this.search();
  }

  openChange(isOpen) {
    if (isOpen) {
      setTimeout(() => { this.searchEle.nativeElement.children[0].focus() }, 100);
    } else {
      return;
      if (this.selectedBox.id) {
        this.valid = true;
      } else {
        this.valid = false;
      }
    }
  }

  search() {
    if (this.searchKey.length > 0) {
      this.filteredBoxes = this.boxes.filter(x => x.name.toLowerCase().indexOf(this.searchKey.toLowerCase()) >= 0 || x.number.toLowerCase().indexOf(this.searchKey.toLowerCase()) >= 0);
    }
    else {
      this.filteredBoxes = this.boxes.slice(0, 10);
    }
  }
}
