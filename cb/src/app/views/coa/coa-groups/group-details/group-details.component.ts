import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemService } from 'src/app/_services/item.service';
import { WorkspaceService } from 'src/app/_services/workspace.service';
import { finalize } from 'rxjs/operators';

export enum GroupTypeCategory {
  general, payroll, payrollEarning, payrollDedCon, utility, otherExpense
}

@Component({
  selector: 'group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class ItemDetailsComponent implements OnInit, AfterViewInit {

  get GroupTypeCategory() { return GroupTypeCategory; }

  isEdit = false;
  editingId = null;
  isDisable = true;
  closeResult: string;
  @ViewChild('content', { static: false }) private content;
  formIsProcessing = false;
  processingTest = 'Please wait...';
  groupTypeRequired = false;

  resetParent: Subject<any>;
  resetType: Subject<any>;
  resetBoxW2: Subject<any>;
  resetBox1099: Subject<any>;
  resetFund: Subject<any>;
  resetDept: Subject<any>;
  resetAcc: Subject<any>;
  resetLAcc: Subject<any>;
  resetPayTo: Subject<any>;
  resetSalesTax: Subject<any>;
  resetServiceType: Subject<any>;

  needsBroadcast = false;

  groupForm: FormGroup;
  groupId: FormControl;
  groupName: FormControl;
  groupDescription: FormControl;
  taxable: FormControl;
  preTax: FormControl;
  grossNet: FormControl
  payrollAccId: FormControl;
  limit: FormControl;
  meterType: FormControl;
  group;

  formEditable = true;

  groupCategory: GroupTypeCategory;
  utilityCategory = [
    "6ABFB959-D6A9-45C4-887A-71DF35663FEE",
    "FFCED714-FDC2-4AF0-B224-BDB6BD5A9C3B",
    "D4551F5C-F022-43D8-8995-E9B9A6CA5619",
    "58A42ADC-D613-489E-980F-B5F5B86C3336",
    "104C5009-7A95-4B08-8F75-5583294CB4FF",
    "F7C9360E-A5CF-4460-8B27-707045F2FE2F",
    "F5E2F058-50BE-4A27-9419-6D6EC90E63E3"];

  payrollEarningCategory = [
    '5AE9CCAE-C95D-4A2F-8D5E-718C99C7E2CC'
  ];

  payrollCategory = [
    '17DA518B-57EB-40B2-92D0-DE0401F077FF'
  ];

  payrollDedConCategory = [
    'BFAFB4AF-7F6E-4C03-AA5F-A4DDFE382FF4',
    'DC82AFF7-87F9-4DB9-9C9A-673D8663C833'
  ];

  otherExpenseCategory = [
    '595A47BE-4910-4194-A0BC-BECC02736B43'
  ];

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private itemSvc: ItemService,
    private workspace: WorkspaceService
  ) {

    this.resetParent = new Subject();
    this.resetSalesTax = new Subject();
    this.resetType = new Subject();
    this.resetBoxW2 = new Subject();
    this.resetBox1099 = new Subject();
    this.resetFund = new Subject();
    this.resetDept = new Subject();
    this.resetAcc = new Subject();
    this.resetLAcc = new Subject();
    this.resetPayTo = new Subject();
    this.resetServiceType = new Subject();
    this.groupCategory = GroupTypeCategory.general;

    this.resetGroup();
  }

  resetGroup() {
    this.group = {
      name: '',
      description: '',
      parentID: null,
      defaultSalesTaxID: null,
      expenseAccountID: null,
      fundID: null,
      groupID: null,
      departmentID: null,
      liabilityAccountID: null,
      box1099ID: null,
      boxW2ID: null,
      groupTypeID: null,
      preTax: false,
      taxable: false,
      grossOrNet: '',
      payrollAccId: '',
      meterType: '',
      payableTo: '',
      uBServiceTypeID: null
    }
  }

  ngOnInit() {
    this.isEdit = this.router.url.toLowerCase().startsWith('/items/edit');
    this.createFormControls();
    this.createForm();
  }

  ngAfterViewInit() {
    this.open(this.content);
    if (this.isEdit) {
      this.formEditable = true;
      this.editingId = this.router.url.toLowerCase().split('edit/')[1];
      this.fetchGroup();

    }
  }

  fetchGroup() {
    this.formIsProcessing = true;
    console.log(this.editingId);
    this.itemSvc.fetchOne(this.editingId).pipe(
      finalize(() => {
        this.formIsProcessing = false;
        this.groupTypeRender();
      })
    ).subscribe(res => {
      this.group = res.data;
      this.groupId.setValue(this.group.id);
      this.groupName.setValue(this.group.name);
      this.groupDescription.setValue(this.group.description);
      this.taxable.setValue(this.group.taxable);
      this.preTax.setValue(this.group.preTax);
      this.grossNet.setValue(this.group.grosOrNet);
      this.payrollAccId.setValue(this.group.payrollAccId);
      this.meterType.setValue(this.group.meterType);
      this.limit.setValue(this.group.limit);

      this.resetParent.next(this.group.parentID);
      this.resetType.next(this.group.groupTypeID);
      this.resetBoxW2.next(this.group.boxW2ID);
      this.resetBox1099.next(this.group.box1099ID);
      this.resetAcc.next(this.group.expenseAccountID);
      this.resetLAcc.next(this.group.liabilityAccountID);
      this.resetFund.next(this.group.fundID);
      this.resetDept.next(this.group.departmentID);
      this.resetPayTo.next(this.group.payableTo);
      this.resetSalesTax.next(this.group.defaultSalesTaxID);
      this.resetServiceType.next(this.group.ubServiceTypeID);
    },
      err => {
        console.log(err);
      })
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'md' }).result.then(
      result => { this.router.navigate(['/coa/groups']) },
      result => { this.router.navigate(['/coa/groups']) }
    )
  }

  closeModal() {
    if (this.needsBroadcast) {
      this.itemSvc.broadcastItemChange();
    }
    this.modalService.dismissAll('Cross click');
  }

  createFormControls() {
    this.groupId = new FormControl('');
    this.groupName = new FormControl('', [Validators.required, Validators.maxLength(50)]);
    this.groupDescription = new FormControl('');
    this.taxable = new FormControl(false);
    this.preTax = new FormControl(false);
    this.grossNet = new FormControl('');
    this.payrollAccId = new FormControl('');
    this.meterType = new FormControl('');
    this.limit = new FormControl(0);
  }

  createForm() {
    this.groupForm = new FormGroup({
      id: this.groupId,
      name: this.groupName,
      description: this.groupDescription,
      taxable: this.taxable,
      preTax: this.preTax,
      grossNet: this.grossNet,
      payrollAccId: this.payrollAccId,
      meterType: this.meterType,
      limit: this.limit
    })
  }

  selectGroupType(group) {
    this.groupTypeRequired = false;
    this.group.groupTypeID = group.id;
    this.groupTypeRender();
  }

  selectParent(group) {
    this.group.parentID = group.id;
  }

  selectTaxGroup(group) {
    this.group.defaultSalesTaxID = group.id;
  }

  selectPayTo(group) {
    this.group.payableTo = group.id;
  }

  selectBoxW2(group) {
    this.group.boxW2ID = group.id;
  }

  selectBox1099(group) {
    this.group.box1099ID = group.id;
  }

  selectAccount(group) {
    this.group.expenseAccountID = group.id;
  }

  selectLAccount(group) {
    this.group.liabilityAccountID = group.id;
  }

  selectFund(group) {
    this.group.fundID = group.id;
  }

  selectDepartment(group) {
    this.group.departmentID = group.id;
  }

  selectServiceType(group) {
    this.group.uBServiceTypeID = group.id;
  }

  groupTypeRender() {
    if (!this.group.groupTypeID) {
      this.groupCategory = GroupTypeCategory.general;
      return;
    }

    let groupTypeID = this.group.groupTypeID.toUpperCase();
    if (this.utilityCategory.includes(groupTypeID)) {
      this.groupCategory = GroupTypeCategory.utility;
      return;
    }

    if (this.payrollCategory.includes(groupTypeID)) {
      this.groupCategory = GroupTypeCategory.payroll;
      return;
    }

    if (this.payrollDedConCategory.includes(groupTypeID)) {
      this.groupCategory = GroupTypeCategory.payrollDedCon;
      return;
    }

    if (this.otherExpenseCategory.includes(groupTypeID)) {
      this.groupCategory = GroupTypeCategory.otherExpense;
      return;
    }

    this.groupCategory = GroupTypeCategory.general;
  }

  submitForm(closeModal: boolean) {
    this.formIsProcessing = true;

    if (this.groupForm.valid) {

      this.group.name = this.groupName.value;
      this.group.description = this.groupDescription.value;
      this.group.taxable = this.taxable.value;
      this.group.preTax = this.preTax.value;
      this.group.grossOrNet = this.grossNet.value;
      this.group.payrollAccId = this.payrollAccId.value;
      this.group.meterType = this.meterType.value;
      this.group.limit = this.limit.value;

      if (this.isEdit) {
        //Modal is in edit mode
        this.itemSvc.update(this.group).pipe(
          finalize(() => {
            this.formIsProcessing = false;
          })
        ).subscribe(res => {
          this.needsBroadcast = true;
          if (closeModal) {
            this.closeModal();
          }
          this.workspace.successToast({
            message: 'Group updated'
          });
        },
          err => {
            this.workspace.errorToast({
              message: 'Group could not be updated'
            });
            console.log(err);
          });
      }
      else {
        //Modal is in create mode
        this.itemSvc.create(this.group).pipe(
          finalize(() => {
            this.formIsProcessing = false;
          })
        ).subscribe(res => {
          this.needsBroadcast = true;
          if (closeModal) {
            this.closeModal();
          } else {
            this.groupForm.reset();
            this.resetParent.next();
            this.resetType.next();
            this.resetBoxW2.next();
            this.resetBox1099.next();
            this.resetFund.next();
            this.resetDept.next();
            this.resetAcc.next();
            this.resetLAcc.next();
            this.resetServiceType.next();
            this.resetGroup();
          }
          this.workspace.successToast({
            message: 'Group added'
          });
        },
          err => {
            this.workspace.errorToast({
              message: 'Group could not be added'
            });
            console.log(err);
          });
      }

    }
  }
}
