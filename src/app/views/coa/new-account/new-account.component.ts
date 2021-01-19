import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/_services/account.service';
import { finalize } from 'rxjs/operators';
import { WorkspaceService } from 'src/app/_services/workspace.service';

@Component({
  selector: 'new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit {

  isEdit = false;
  editingId = null;
  closeResult: string;
  @ViewChild('content', { static: false }) private content;
  formIsProcessing = false;
  processingTest = 'Please wait...';
  accountParentIdRequired = false;
  accountTypeRequired = false;
  accountBoxW2Required = false;
  accountBox1099Required = false;
  resetSbj: Subject<any>;
  resetAcc: Subject<any>;
  resetType: Subject<any>;
  resetBoxW2: Subject<any>;
  resetBox1099: Subject<any>;
  needsBroadcast = false;

  accountForm: FormGroup;
  accountId: FormControl;
  accountNumber: FormControl;
  accountName: FormControl;
  accountDescription: FormControl;

  account;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private accountSvc: AccountService,
    private workspace: WorkspaceService
  ) {
    this.resetAccount();
    this.resetSbj = new Subject();

    this.resetAcc = new Subject();
    this.resetType = new Subject();
    this.resetBoxW2 = new Subject();
    this.resetBox1099 = new Subject();
  }


  resetAccount() {
    this.account = {
      number: '',
      name: '',
      description: '',
      parentID: '',
      box1099ID: null,
      boxW2ID: null,
      typeID: '',
      isFromPortal : true
    }
  }

  ngOnInit() {
    this.isEdit = this.router.url.toLowerCase().startsWith('/coa/accounts/edit');
    this.createFormControls();
    this.createForm();
  }

  ngAfterViewInit() {
    this.open(this.content);

    if (this.isEdit) {
      this.editingId = this.router.url.toLowerCase().split('edit/')[1];
      this.fetchAccount();
    }
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'md' }).result.then(
      result => { this.router.navigate(['/coa/accounts']) },
      result => { this.router.navigate(['/coa/accounts']) }
    )
  }

  fetchAccount() {
    this.formIsProcessing = true;
    console.log(this.editingId);
    this.accountSvc.fetchOne(this.editingId).pipe(
      finalize(() => {
        this.formIsProcessing = false;
      })
    ).subscribe(res => {
      this.account = res.data;
      this.accountId.setValue(this.account.id);
      this.accountName.setValue(this.account.name);
      this.accountNumber.setValue(this.account.number);
      this.accountDescription.setValue(this.account.description);

      this.resetAcc.next(this.account.parentID);
      this.resetType.next(this.account.typeID);
      this.resetBoxW2.next(this.account.boxW2ID);
      this.resetBox1099.next(this.account.box1099ID);

      this.accountParentIdRequired = false;
      this.accountTypeRequired = false;
    },
      err => {
        console.log(err);
      })
  }

  closeModal() {
    if(this.needsBroadcast){
      this.accountSvc.broadcastAccountChange();
    }
    this.modalService.dismissAll('Cross click');
  }

  createFormControls() {
    this.accountId = new FormControl('');
    this.accountName = new FormControl('', [Validators.required, Validators.maxLength(50)]);
    this.accountNumber = new FormControl('', Validators.required);
    this.accountDescription = new FormControl('');
  }

  createForm() {
    this.accountForm = new FormGroup({
      id: this.accountId,
      number: this.accountNumber,
      name: this.accountName,
      desscription: this.accountDescription,
    });
  }

  selectAccount(item) {
    this.accountParentIdRequired = false;
    this.account.parentID = item.id;
    this.account.typeID = item.typeID;
    this.resetType.next(item.typeID);
  }

  selectType(item) {
    this.accountTypeRequired = false;
    this.account.typeID = item.id;
  }

  selectBoxW2(item) {
    this.accountBoxW2Required = false;
    this.account.boxW2ID = item.id;
  }

  selectBox1099(item) {
    this.accountBox1099Required = false;
    this.account.box1099ID = item.id;
  }

  submitForm(closeModal: boolean) {
    this.formIsProcessing = true;

    if (this.accountForm.valid) {

      if (this.account.parentID && this.account.parentID != '') {
        if (this.account.typeID && this.account.typeID != '') {

          this.account.number = this.accountNumber.value;
          this.account.name = this.accountName.value;
          this.account.description = this.accountDescription.value;

          if (this.isEdit) {
            //Modal is in edit mode

            this.accountSvc.update(this.account).pipe(
              finalize(() => {
                this.formIsProcessing = false;
              })
            ).subscribe(res => {
              this.needsBroadcast = true;
              if (closeModal) {
                this.closeModal();
              }
              this.workspace.successToast({
                message: 'Account updated'
              });
            },
              err => {
                this.workspace.errorToast({
                  message: 'Account could not be updated'
                });
                console.log(err);
              });

          }
          else {
            //Modal is in create mode
            this.accountSvc.create(this.account).pipe(
              finalize(() => {
                this.formIsProcessing = false;
              })
            ).subscribe(res => {
              this.needsBroadcast = true;
              if (closeModal) {
                this.closeModal();
              } else {
                this.accountForm.reset();
                this.resetSbj.next();
                this.resetAccount();
              }
              this.workspace.successToast({
                message: 'Account added'
              });
            },
              err => {
                this.workspace.errorToast({
                  message: 'Account could not be updated'
                });
                console.log(err);
              });

          }
        } else {
          this.accountTypeRequired = true;
        }
      } else {
        this.accountParentIdRequired = true;
      }


    }
  }

}
