import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/_services/item.service';
import { finalize } from 'rxjs/operators';
import { WorkspaceService } from 'src/app/_services/workspace.service';

@Component({
  selector: 'rates-table',
  templateUrl: './rates-table.component.html',
  styleUrls: ['./rates-table.component.css']
})
export class RatesTableComponent implements OnInit {


  isDisable = true;
  closeResult: string;
  @ViewChild('content', { static: false }) private content;
  isListLoading = false;
  processingText = "Please wait...";
  rates = [];
  currentGroupId: string;

  formEditable;
  constructor(
    private modalService: NgbModal,
    private itemSvc: ItemService,
    private workspace: WorkspaceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscribeToService();
  }

  subscribeToService() {
    this.itemSvc.ratesObs.subscribe(val => {
      if (val.open) {
        this.open();
      }
      this.currentGroupId = val.itemId;
      this.fetchRate();
    });
  }

  open() {
    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title', size: 'sm' });/*
    .result.then(
      result => { this.router.navigate(['/groups']) },
      result => { this.router.navigate(['/groups']) }
    )*/
  }

  fetchRate() {
    this.isListLoading = true;

    this.itemSvc.rates(this.currentGroupId).pipe(
      finalize(() => {
        this.isListLoading = false;
      })).subscribe(res => {
        this.rates = res.data;
        this.rates.push({
          id: new Date().getTime(),
          minQty: null,
          rate: 0,
          batch: 1.0,
          isActive: true,
          isGroup: false,
          isPrimary: false,
          isNew: true,
          unCommited: true
        });
      },
        err => {
          console.log(err);
        })
  }

  saveRates(close: boolean) {
    this.isListLoading = true;
    this.rates.forEach(x => {
      if (x.isNew) {
        delete x.id;
      }
      x.minQty = parseInt(x.minQty);
      x.rate = parseFloat(x.rate);
      x.batch = parseFloat(x.batch);
    });

    this.rates = this.rates.filter(x => !x.unCommited);

    this.itemSvc.ratesUpdate(this.currentGroupId, this.rates).pipe(
      finalize(() => {
        this.isListLoading = false;

        if (close) this.closeModal();
      })
    ).subscribe(res => {
      this.workspace.successToast({ message: 'Rates updated' })
    },
      err => {

      });
  }

  primaryChanged(rate) {
    rate.unCommited = false;
    if (rate.isPrimary) {
      this.rates.forEach(x => {
        x.isPrimary = (x.id == rate.id)
      });
    }
  }

  addNew(i) {
    if (this.rates.length == i + 1) {
      this.rates.push({
        id: new Date().getTime(),
        minQty: null,
        rate: 0,
        batch: 1.0,
        isActive: true,
        isGroup: false,
        isPrimary: false,
        isNew: true,
        unCommited: true
      });
    }
  }

  applySort() {
    this.rates = this.rates.filter(x => !x.unCommited).sort((a, b) => a.minQty - b.minQty);
    this.rates.push({
      id: new Date().getTime(),
      minQty: null,
      rate: 0,
      batch: 1.0,
      isActive: true,
      isGroup: false,
      isPrimary: false,
      isNew: true,
      unCommited: true
    });
  }

  closeModal() {
    this.modalService.dismissAll('Cross click');
  }

  deleteRate(rate) {
    this.rates = this.rates.filter(x => x.id != rate.id);
  }

}
