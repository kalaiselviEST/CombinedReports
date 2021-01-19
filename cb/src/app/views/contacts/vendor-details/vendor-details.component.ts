import { Component, OnInit, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'vendor-details',
  templateUrl: './vendor-details.component.html',
  styleUrls: ['./vendor-details.component.css']
})
export class VendorDetailsComponent implements OnInit, AfterViewInit {

  closeResult: string;
  @ViewChild('content', {static: false}) private content;
  formEditable = false;
  
  constructor(
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.open(this.content);
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'md'}).result.then(
      result => {this.router.navigate(['/contacts'])},
      result => {this.router.navigate(['/contacts'])}
    )
  }

  closeModel(){
    this.modalService.dismissAll('Cross click');
  }

}
