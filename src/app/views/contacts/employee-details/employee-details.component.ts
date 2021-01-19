import { Component, OnInit, ViewChild, AfterViewInit, HostListener, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit, AfterViewInit {

  closeResult: string;
  @ViewChild('content', {static: false}) private content;
  formEditable = false;
  tabEditable = false;
  
  changeSbj: Subject<any>;
  changeObs: Observable<any>;

  infoSbj: Subject<any>;
  infoObs: Observable<any>;

  earningAdditionSbj: Subject<any>;
  earningAdditionObs: Observable<any>;

  taxesBenefitsSbj: Subject<any>;
  taxesBenefitsObs: Observable<any>;

  compensatedAbsencesSbj: Subject<any>;
  compensatedAbsencesObs: Observable<any>;

  activitiesSbj: Subject<any>;
  activitiesObs: Observable<any>;

  isLoading = true;

  selectedtabName = 'employeeInfo';
  activeTab = {
    employeeInfo: true,
    earningAddition: false,
    compensatedAbsences: false,
    taxesBenefits: false,
    activities: false
  }
  
  constructor(
    private modalService: NgbModal,
    private router: Router
  ) { 
    this.changeSbj = new Subject();
    this.changeObs = this.changeSbj.asObservable();

    this.infoSbj = new Subject();
    this.infoObs = this.infoSbj.asObservable();

    this.earningAdditionSbj = new Subject();
    this.earningAdditionObs = this.earningAdditionSbj.asObservable();

    this.taxesBenefitsSbj = new Subject();
    this.taxesBenefitsObs = this.taxesBenefitsSbj.asObservable();

    this.compensatedAbsencesSbj = new Subject();
    this.compensatedAbsencesObs = this.earningAdditionSbj.asObservable();

    this.activitiesSbj = new Subject();
    this.activitiesObs = this.earningAdditionSbj.asObservable();
  }

  ngOnInit() {
    this.broadcastChange();
  }

  ngAfterViewInit() {
    this.open(this.content);
  }

  resetActiveTab() {
    this.activeTab = {
      employeeInfo: false,
      earningAddition: false,
      compensatedAbsences: false,
      taxesBenefits: false,
      activities: false
    }
  }

  selectTab(tabName) {
    this.resetActiveTab();
    this.activeTab[tabName] = true;
    this.selectedtabName = tabName;
    setTimeout(() => {
      this.broadcastChange();
    },100);
  }

  broadcastChange() {
    switch (this.selectedtabName) {
      case 'employeeInfo':
        this.infoSbj.next(this.selectedtabName);
        break;
      case 'earningAddition':
        this.earningAdditionSbj.next(this.selectedtabName);
        break;
      case 'taxesBenefits':
        this.taxesBenefitsSbj.next(this.selectedtabName);
        break;
      case 'compensatedAbsences':
        this.compensatedAbsencesSbj.next(this.selectedtabName);
        break;
      case 'activities':
        this.activitiesSbj.next(this.selectedtabName);
        break;
      default:
        this.resetActiveTab();
        this.activeTab.employeeInfo = true;
        this.selectedtabName = 'employeeInfo'
        break;
    }
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then(
      result => {this.router.navigate(['/contacts'])},
      result => {this.router.navigate(['/contacts'])}
    )
  }

  closeModel(){
    this.modalService.dismissAll('Cross click');
  }

}
