import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Form, Validators } from '@angular/forms';
import { FundService } from 'src/app/_services/fund.service';
import { finalize } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { WorkspaceService } from 'src/app/_services/workspace.service';

@Component({
  selector: 'new-fund',
  templateUrl: './new-fund.component.html',
  styleUrls: ['./new-fund.component.css']
})
export class NewFundComponent implements OnInit, AfterViewInit {

  isEdit = false;
  editingId = null;
  closeResult: string;
  @ViewChild('content', { static: false }) private content;
  formIsProcessing = false;
  processingTest = 'Please wait...';
  fundParentIdRequired = false;
  resetSbj: Subject<any>;
  resetAcc: Subject<any>;
  needsBroadcast = false;

  fundForm: FormGroup;
  fundId: FormControl;
  fundNumber: FormControl;
  fundName: FormControl;
  fundDescription: FormControl;

  fund;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private fundSvc: FundService,
    private workspace: WorkspaceService
  ) {
    this.resetFund();
    this.resetSbj = new Subject();
    this.resetAcc = new Subject();
  }

  resetFund() {
    this.fund = {
      number: '',
      name: '',
      description: '',
      parentID: '',
      isFromPortal: true
    }
  }

  ngOnInit() {
    this.isEdit = this.router.url.toLowerCase().startsWith('/coa/funds/edit');
    this.createFormControls();
    this.createForm();
  }

  ngAfterViewInit() {
    this.open(this.content);

    if (this.isEdit) {
      this.editingId = this.router.url.toLowerCase().split('edit/')[1];
      this.fetchFund();
    }
  }

  fetchFund() {
    this.formIsProcessing = true;
    console.log(this.editingId);
    this.fundSvc.fetchOne(this.editingId).pipe(
      finalize(() => {
        this.formIsProcessing = false;
      })
    ).subscribe(res => {
      this.fund = res.data;
      this.fundId.setValue(this.fund.id);
      this.fundName.setValue(this.fund.name);
      this.fundNumber.setValue(this.fund.number);
      this.fundDescription.setValue(this.fund.description);

      this.fundParentIdRequired = false;
      this.resetAcc.next(this.fund.parentID);
    },
      err => {
        console.log(err);
      })
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'md', backdrop: 'static' }).result.then(
      result => { this.router.navigate(['/coa/funds']) },
      result => { this.router.navigate(['/coa/funds']) }
    )
  }

  closeModal() {
    if (this.needsBroadcast) {
      this.fundSvc.broadcastFundChange();
    }
    this.modalService.dismissAll('Cross click');
  }

  createFormControls() {
    this.fundId = new FormControl('');
    this.fundName = new FormControl('', [Validators.required, Validators.maxLength(50)]);
    this.fundNumber = new FormControl('', Validators.required);
    this.fundDescription = new FormControl('');
  }

  createForm() {
    this.fundForm = new FormGroup({
      id: this.fundId,
      number: this.fundNumber,
      name: this.fundName,
      desscription: this.fundDescription,
    });
  }

  selectFund(item) {
    this.fundParentIdRequired = false;
    this.fund.parentID = item.id;
  }

  submitForm(closeModal: boolean) {
    this.formIsProcessing = true;

    if (this.fundForm.valid) {

      if (this.fund.parentID && this.fund.parentID != '') {
        //Fund Sub Of valiation - since its not a formControl
        this.fund.number = this.fundNumber.value;
        this.fund.name = this.fundName.value;
        this.fund.description = this.fundDescription.value;
        if (this.isEdit) {
          //Modal is in edit mode
          this.fundSvc.update(this.fund).pipe(
            finalize(() => {
              this.formIsProcessing = false;
            })
          ).subscribe(res => {
            this.needsBroadcast = true;
            if (closeModal) {
              this.closeModal();
            }
            this.workspace.successToast({
              message: 'Fund updated'
            });
          },
            err => {
              this.workspace.errorToast({
                message: 'Fund could not be updated'
              });
              console.log(err);
            });
        }
        else {
          //Modal is in create mode
          this.fundSvc.create(this.fund).pipe(
            finalize(() => {
              this.formIsProcessing = false;
            })
          ).subscribe(res => {
            this.needsBroadcast = true;
            if (closeModal) {
              this.closeModal();
            } else {
              this.fundForm.reset();
              this.resetSbj.next();
              this.resetFund();
            }
            this.workspace.successToast({
              message: 'Fund added'
            });
          },
            err => {
              this.workspace.errorToast({
                message: 'Fund could not be added'
              });
              console.log(err);
            });
        }
      } else {
        this.fundParentIdRequired = true;
        this.formIsProcessing = false;
        this.workspace.warningToast({ message: 'Sub of is required' })
      }
    }
  }
}
