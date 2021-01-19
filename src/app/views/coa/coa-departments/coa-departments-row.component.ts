import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { DepartmentService } from 'src/app/_services/department.service';
import { finalize } from 'rxjs/operators';
import { WorkspaceService } from 'src/app/_services/workspace.service';

@Component({
  selector: 'coa-departments-row',
  templateUrl: './coa-departments-row.component.html'
})
export class CoaDepartmentsRowComponent implements OnInit {
  @Input() parentID = null;
  @Input() isSearch = false;
  @Input() searchObs: Observable<any> = null;
  searchKey = '';
  filtereddepartments = [];

  constructor(
    private departmentSvc: DepartmentService,
    private ref: ChangeDetectorRef,
    private workspace: WorkspaceService
  ) { }

  ngOnInit() {
    //this.filtereddepartments = this.departmentSvc.departments.filter(x => x.parentID == this.parentID);
    this.filterDepartments('');
    if (this.searchObs != null) {
      this.searchObs.subscribe(s => {
        this.searchKey = s;
        this.filterDepartments(s);
      })
    }
  }

  filterDepartments(searchKey) {
    if (searchKey.trim() != '') {
      this.filtereddepartments = this.departmentSvc.departments.filter(x => x.number.toString().toLowerCase().indexOf(searchKey) > -1 || x.name.toLowerCase().indexOf(searchKey) > -1 || x.description.toLowerCase().indexOf(searchKey) > -1);
      this.isSearch = true;
    } else {
      this.isSearch = false;
      this.filtereddepartments = this.departmentSvc.departments.filter(x => x.parentID == this.parentID);
    }

  }

  toggleActive(department) {
    department.isActive = !department.isActive;
    department.isLoading = true;
    this.departmentSvc.toggleActive(department.id, department.isActive).pipe(
      finalize(() => {
        department.isLoading = false;
        this.ref.detectChanges();
      })
    ).subscribe(res => {
      //200 denotes it was successfull
      department.isLoading = false;

      if (res.statusCode != 200) {
        //revert back if failed
        department.isActive = !department.isActive;
      }

      if (res.statusCode == 422) {
        this.workspace.warningToast({
          message: 'Department has active children'
        })
      }
    },
      err => {
        //revert back if failed
        department.isActive = !department.isActive;
        department.isLoading = false;
      })
  }

  deleteConfirm(department) {
    department.isDeleting = true;
  }

  deleteDepartment(department, i) {
    department.isLoading = true;
    this.departmentSvc.delete(department.id).pipe(
      finalize(() => {
        department.isLoading = false;
        department.isDeleting = false;
      })
    ).subscribe(res => {

      if (res.statusCode == 422) {
        this.workspace.warningToast({
          message: 'Department has children'
        })
      }

      //200 denotes it was successfull
      if (res.statusCode == 200) {
        this.filtereddepartments.splice(i, 1);
      }
    },
      err => {
        department.isLoading = false;
      })
  }
}
