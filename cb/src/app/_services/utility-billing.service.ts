import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { Api } from '../_helpers/api';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilityBillingService {
  private utilityBillingSubject = new Subject<any>();
  public utilityBillingObs: Observable<any>;
  public utilityBillings = [];
  private apiUri: string;
  private portal: {
    id: string,
    displayName: string,
    legalName: string
  };

  constructor(
    private router: Router,
    private authSvc: AuthService,
    private http: HttpClient
  ) {

    this.apiUri = environment.apiBase;
    this.utilityBillingObs = this.utilityBillingSubject.asObservable();
    var portal = localStorage.getItem('Portal');
    if (portal) {
      this.portal = JSON.parse(portal);
    }

  }

  broadcastUtilityBillingChange() {
    this.utilityBillingSubject.next();
  }

  fetchServiceTypes() {
    return this.http.get<any>(this.apiUri + Api.utilityBilling.serviceTypes);
  }

}
