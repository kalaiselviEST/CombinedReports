import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.css']
})
export class CustomizeComponent implements OnInit, AfterViewInit {

  closeResult: string;
  @ViewChild('content', {static: false}) private content;
  formEditable = false;
  isListLoading = true;
  sampleArr = Array(75).fill(0).map((x, i) => i);
  selectedId: number;
  
  constructor(
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit() { 
    this.dummyLoader();
  }

  ngAfterViewInit() {
    this.open(this.content);
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'md'}).result.then(
      result => {this.router.navigate(['/properties'])},
      result => {this.router.navigate(['/properties'])}
    )
  }

  closeModel(){
    this.modalService.dismissAll('Cross click');
  }

  dummyLoader() {
    this.isListLoading = true;
    this.sampleArr = []
    setTimeout(() => {
      this.sampleArr = Array(75).fill(0).map((x, i) => i);
      this.isListLoading = false;      
    }, 1500);
  }

  contactClicked(num: number){

  }

}
