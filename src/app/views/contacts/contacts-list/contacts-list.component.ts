import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ItemService } from 'src/app/_services/item.service';
import { ContactService } from 'src/app/_services/contact.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

  @ViewChild('tbody', { static: false }) private tbody: ElementRef;
  @Input() mini = false;
  @Output() activeContactChange = new EventEmitter();
  selectedId = 0;

  transactionTypes = [
    { text: 'All', value: 0 },
    { text: 'Customer', value: 1 },
    { text: 'Utility Billing', value: 2 },
    { text: 'Court', value: 3 },
    { text: 'Property Tax', value: 4 },
    { text: 'Vendor', value: 5 },
    { text: 'Employee', value: 6 }
  ];
  isListLoading = true;
  sampleArr = Array(75).fill(0).map((x, i) => i);


  constructor(
    public contactSvc: ContactService
  ) { }

  ngOnInit() {
    console.log(this.sampleArr);
    this.fetchContacts();

    //dummy subscribe
    this.contactSvc.basicInfoSave.asObservable().subscribe(() => {
      this.fetchContacts();
    });
  }

  transactionTypeFilter(item) {
    this.dummyLoader();
    //console.log(item.text);
  }

  fetchContacts() {
    this.isListLoading = true;
    this.contactSvc.fetch('').pipe(
      finalize(() => {
        this.isListLoading = false;
        this.contactClicked(this.contactSvc.contacts[0].id);
      })
    ).subscribe(res => {
      this.contactSvc.contacts = res.data;

      if (res.data.length > 0)
        this.stripColorRows();
    },
      err => {
        console.log(err);
      })
  }

  dummyLoader() {
    this.isListLoading = true;
    this.sampleArr = []
    setTimeout(() => {
      this.sampleArr = Array(75).fill(0).map((x, i) => i);
      this.isListLoading = false;
      this.contactClicked(0);
    }, 2000);
  }

  contactClicked(data) {
    this.selectedId = data;
    this.activeContactChange.emit(data);
  }


  stripColorRows() {
    setTimeout(() => {
      if (!this.tbody) return;
      var rows = this.tbody.nativeElement.querySelectorAll('.table-row');
      for (var i = 0; i < rows.length; i++) {
        if (i % 2 == 0)
          rows[i].classList.add('even');
        else
          rows[i].classList.remove('even');
      }
    }, 1000);
  }
}
