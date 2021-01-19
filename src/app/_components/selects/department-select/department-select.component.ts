import { Component, OnInit, Output, Input, EventEmitter, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { DepartmentService } from 'src/app/_services/department.service';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'department-select',
  templateUrl: './department-select.component.html',
  styleUrls: ['./department-select.component.css']
})
export class DepartmentSelectComponent implements OnInit {

  @Input() buttonClass: string;
  @Input() menuClass: string;
  @Input() valid: boolean;
  @Input() resetObs: Observable<any>;
  @Output() departmentChange = new EventEmitter();
  @Input() required: boolean;
  isListLoading = true;
  departments = [];
  selectedDepartment;
  @ViewChild('formSearch', { static: false }) searchEle: ElementRef;
  searchKey = "";
  resetId = null;
  listLimit = 50

  filteredDepartments = [];

  constructor(private departmentSvc: DepartmentService, private changeDetector: ChangeDetectorRef) {
    this.resetDepartment(null);
  }

  ngOnInit() {
    this.fetchDepartments();
    this.resetObs.subscribe(id => { this.resetDepartment(id); })
  }

  resetDepartment(id) {
    this.resetId = id;
    if (id) {
      var sel = this.departments.filter(x => x.id == id);
      if (sel.length > 0) {
        this.selectedDepartment = sel[0];
        return;
      }
    }

    this.selectedDepartment = {
      id: null,
      name: '',
      number: null
    }
  }

  fetchDepartments() {
    this.isListLoading = true;
    this.departmentSvc.fetch().pipe(
      finalize(() => {
        this.isListLoading = false;
      })
    ).subscribe(res => {
      this.departments = res.data;
      this.filteredDepartments = this.departments.slice(0, this.listLimit);
      this.resetDepartment(this.resetId);
    },
      err => {
        console.log(err);
      })
  }

  selectItem(item) {
    this.selectedDepartment = item;
    this.departmentChange.emit(item);
    this.searchKey = '';
    this.search();
  }

  openChange(isOpen) {
    if (isOpen) {
      setTimeout(() => { this.searchEle.nativeElement.children[0].focus() }, 100);
    } else {
      if (this.selectedDepartment.id) {
        this.valid = true;
      } else {
        this.valid = false;
      }
    }
  }

  search() {
    if (this.searchKey.length > 0) {
      this.filteredDepartments = this.departments.filter(x => x.name.toLowerCase().indexOf(this.searchKey.toLowerCase()) >= 0 || x.number.toLowerCase().indexOf(this.searchKey.toLowerCase()) >= 0);
    }
    else {
      this.filteredDepartments = this.departments.slice(0, this.listLimit);
    }
  }
}
