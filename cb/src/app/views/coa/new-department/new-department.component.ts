import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Form, Validators } from '@angular/forms';
import { DepartmentService } from 'src/app/_services/department.service';
import { finalize } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { WorkspaceService } from 'src/app/_services/workspace.service';

@Component({
  selector: 'new-department',
  templateUrl: './new-department.component.html',
  styleUrls: ['./new-department.component.css']
})
export class NewDepartmentComponent implements OnInit, AfterViewInit {

  isEdit = false;
  editingId = null;
  closeResult: string;
  @ViewChild('content', { static: false }) private content;
  formIsProcessing = false;
  processingTest = 'Please wait...';
  departmentParentIdRequired = false;
  resetSbj: Subject<any>;
  resetAcc: Subject<any>;
  needsBroadcast = false;

  departmentForm: FormGroup;
  departmentId: FormControl;
  departmentNumber: FormControl;
  departmentName: FormControl;
  departmentDescription: FormControl;

  department;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private departmentSvc: DepartmentService,
    private workspace: WorkspaceService
  ) {
    this.resetDepartment();
    this.resetSbj = new Subject();
    this.resetAcc = new Subject();
  }

  resetDepartment() {
    this.department = {
      number: '',
      name: '',
      description: '',
      parentID: '',
      isFromPortal: true
    }
  }

  ngOnInit() {
    this.isEdit = this.router.url.toLowerCase().startsWith('/coa/departments/edit');
    this.createFormControls();
    this.createForm();
  }

  ngAfterViewInit() {
    this.open(this.content);

    if (this.isEdit) {
      this.editingId = this.router.url.toLowerCase().split('edit/')[1];
      this.fetchDepartment();
    }
  }

  fetchDepartment() {
    this.formIsProcessing = true;
    console.log(this.editingId);
    this.departmentSvc.fetchOne(this.editingId).pipe(
      finalize(() => {
        this.formIsProcessing = false;
      })
    ).subscribe(res => {
      this.department = res.data;
      this.departmentId.setValue(this.department.id);
      this.departmentName.setValue(this.department.name);
      this.departmentNumber.setValue(this.department.number);
      this.departmentDescription.setValue(this.department.description);

      this.departmentParentIdRequired = false;
      this.resetAcc.next(this.department.parentID);
    },
      err => {
        console.log(err);
      })
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'md', backdrop: 'static' }).result.then(
      result => { this.router.navigate(['/coa/departments']) },
      result => { this.router.navigate(['/coa/departments']) }
    )
  }

  closeModal() {
    if (this.needsBroadcast) {
      this.departmentSvc.broadcastDepartmentChange();
    }
    this.modalService.dismissAll('Cross click');
  }

  createFormControls() {
    this.departmentId = new FormControl('');
    this.departmentName = new FormControl('', [Validators.required, Validators.maxLength(50)]);
    this.departmentNumber = new FormControl('', Validators.required);
    this.departmentDescription = new FormControl('');
  }

  createForm() {
    this.departmentForm = new FormGroup({
      id: this.departmentId,
      number: this.departmentNumber,
      name: this.departmentName,
      desscription: this.departmentDescription,
    });
  }

  selectDepartment(item) {
    this.departmentParentIdRequired = false;
    this.department.parentID = item.id;
  }

  submitForm(closeModal: boolean) {
    this.formIsProcessing = true;

    if (this.departmentForm.valid) {

      if (this.department.parentID && this.department.parentID != '') {
        //Department Sub Of valiation - since its not a formControl
        this.department.number = this.departmentNumber.value;
        this.department.name = this.departmentName.value;
        this.department.description = this.departmentDescription.value;
        if (this.isEdit) {
          //Modal is in edit mode
          this.departmentSvc.update(this.department).pipe(
            finalize(() => {
              this.formIsProcessing = false;
            })
          ).subscribe(res => {
            this.needsBroadcast = true;
            if (closeModal) {
              this.closeModal();
            }
            this.workspace.successToast({
              message: 'Department updated'
            });
          },
            err => {
              this.workspace.errorToast({
                message: 'Department could not be updated'
              });
              console.log(err);
            });
        }
        else {
          //Modal is in create mode
          this.departmentSvc.create(this.department).pipe(
            finalize(() => {
              this.formIsProcessing = false;
            })
          ).subscribe(res => {
            this.needsBroadcast = true;
            if (closeModal) {
              this.closeModal();
            } else {
              this.departmentForm.reset();
              this.resetSbj.next();
              this.resetDepartment();
            }
            this.workspace.successToast({
              message: 'Department added'
            });
          },
            err => {
              this.workspace.errorToast({
                message: 'Department could not be added'
              });
              console.log(err);
            });
        }
      } else {
        this.departmentParentIdRequired = true;
      }
    }
  }
}
