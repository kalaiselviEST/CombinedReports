import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { WorkspaceService } from 'src/app/_services/workspace.service';
import { ContactService } from 'src/app/_services/contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  customerUrl = "./customer-details";
  vendorUrl = "./vendor-details";
  paymentUrl = "./payment-details";
  employeeUrl = "./employee-details";
  isContactsListMini = true;
  activeContactSbj: Subject<any>;
  contactObs: Observable<any>;
  public saveTrigger: Subject<any>;
  formEditable = false;
  selectedAcc = {
    name: 'Contact',
    number: "34521"
  }

  isNewContact = false;

  constructor(
    private contactSvc: ContactService,
    private workspace: WorkspaceService
  ) {
    this.activeContactSbj = new Subject();
    this.contactObs = this.activeContactSbj.asObservable();
    this.saveTrigger = new Subject();
  }

  ngOnInit() {
    this.workspace.collapseSideMenu();
    this.subscribeToBasicInfoSave();
  }

  activeContactChange(data) {
    this.activeContactSbj.next(data);
    this.selectedAcc.number = data + "21223";
  }

  addNewContact() {
    this.isNewContact = true;
    this.formEditable = true;
  }

  saveContact() {
    this.saveTrigger.next();
  }

  subscribeToBasicInfoSave() {
    this.contactSvc.basicInfoSave.asObservable().subscribe(() => {
      this.formEditable = false;
    })
  }

  cancelSave() {
    this.formEditable = false;
    this.isNewContact = false;
  }
}
