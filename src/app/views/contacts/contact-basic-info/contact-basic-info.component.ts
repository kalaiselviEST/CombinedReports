import { Component, OnInit, Input, Output, EventEmitter, ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactService } from 'src/app/_services/contact.service';
import { WorkspaceService } from 'src/app/_services/workspace.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'contact-basic-info',
  templateUrl: './contact-basic-info.component.html',
  styleUrls: ['./contact-basic-info.component.css']
})
export class ContactBasicInfoComponent implements OnInit {

  @Input() contactObs: Observable<any>;
  @Input() saveTrigger: Observable<any>;
  @Input() editable: boolean;
  @Output() typeChange = new EventEmitter();
  isLoading = true;
  commShowInactive = false;
  sampleComArray = Array(2).fill(0).map((x, i) => i);
  contactTypes = {
    isCustomer: false,
    isVendor: false,
    isEmployee: false
  };
  isEdit: boolean;

  formIsProcessing = false;

  basicInfo;
  comunication;
  basicForm: FormGroup;
  title: FormControl;
  firstName: FormControl;
  middleName: FormControl;
  lastName: FormControl;
  suffix: FormControl;
  jobTitle: FormControl;
  companyName: FormControl;

  constructor(
    private contactSvc: ContactService,
    private workspace: WorkspaceService
  ) {
    this.resetContact();
  }

  ngOnInit() {
    this.subscribeToContactChange();
    this.createFormControls();
    this.createForm();
    this.subscribeToSave();
  }

  subscribeToContactChange() {
    this.contactObs.subscribe(res => {
      this.isLoading = true;
      this.dummyLoad();
    })
  }

  subscribeToSave() {
    //Save Contact basic info
    this.saveTrigger.subscribe(() => {
      this.formIsProcessing = true;

      if (this.basicForm.valid) {

        this.basicInfo = {
          title: this.title.value,
          firstName: this.firstName.value,
          middleName: this.middleName.value,
          lastName: this.lastName.value,
          suffix: this.suffix.value,
          jobTitle: this.jobTitle.value,
          companyName: this.companyName.value,
          isCustomer: this.contactTypes.isCustomer,
          isEmployee: this.contactTypes.isEmployee,
          isVendor: this.contactTypes.isVendor
        }

        if (this.isEdit) {
          //edit mode
        } else {
          //create Mode
          this.contactSvc.create(this.basicInfo).pipe(
            finalize(() => {
              this.formIsProcessing = false;
            })
          ).subscribe(res => {
            this.basicForm.reset();
            this.resetContact();
            this.workspace.successToast({
              message: 'Contact added'
            });
            this.contactSvc.broadcastBasicInfoSave();
          },
            err => {
              this.workspace.errorToast({
                message: 'Contact could not be added'
              });
              console.log(err);
            });
        }

      } else {
        this.workspace.infoToast({ message: 'Please enter all required fields' })
      }

    })
  }

  resetContact() {
    this.basicInfo = {
      title: '',
      firstName: '',
      middleName: '',
      lastName: '',
      suffix: '',
      jobTitle: '',
      companyName: '',
      isCustomer: false,
      isEmployee: false,
      isVendor: false
    };

    this.contactTypes = {
      isCustomer: false,
      isVendor: false,
      isEmployee: false
    };
  }

  createFormControls() {
    this.title = new FormControl('', [Validators.maxLength(10)]);
    this.firstName = new FormControl('', [Validators.required, Validators.maxLength(50)]);
    this.middleName = new FormControl('', [Validators.maxLength(20)]);
    this.lastName = new FormControl('', [Validators.maxLength(50)]);
    this.suffix = new FormControl('', [Validators.maxLength(20)]);
    this.jobTitle = new FormControl('', [Validators.maxLength(20)]);
    this.companyName = new FormControl('', [Validators.maxLength(50)]);
  }

  createForm() {
    this.basicForm = new FormGroup({
      title: this.title,
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      suffix: this.suffix,
      jobTitle: this.jobTitle,
      companyName: this.companyName
    })
  }

  dummyLoad() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  dummyCommActiveToggle() {
    this.sampleComArray = []

    if (this.commShowInactive) {
      this.sampleComArray = Array(7).fill(0).map((x, i) => i);
    }
    else {
      this.sampleComArray = Array(2).fill(0).map((x, i) => i);
    }
  }
}
