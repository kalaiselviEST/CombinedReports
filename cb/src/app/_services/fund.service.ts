import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import * as AppGlobals from '../app.globals';
import { environment } from 'src/environments/environment';
import { Api } from '../_helpers/api';
import { map } from 'rxjs/operators';
import { JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FundService {
  private fundSubject = new Subject<any>();
  public fundObs: Observable<any>;
  public funds = [];
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

    var portal = localStorage.getItem('Portal');
    if (portal) {
      this.portal = JSON.parse(portal);
    }

    this.fundObs = this.fundSubject.asObservable();
  }

  broadcastFundChange() {
    this.fundSubject.next();
  }

  fetch(all = false) {
    if (all) {
      return this.http.get<any>(this.apiUri + Api.fund.listAll(this.portal.id));
    }
    else {
      return this.http.get<any>(this.apiUri + Api.fund.list(this.portal.id));
    }
  }

  fetchOne(fundId) {
    return this.http.get<any>(this.apiUri + Api.fund.fetchOne(this.portal.id, fundId));
  }

  create(fund) {
    return this.http.post<any>(this.apiUri + Api.fund.create(this.portal.id), fund);
  }

  update(fund) {
    return this.http.post<any>(this.apiUri + Api.fund.update(this.portal.id), fund);
  }

  toggleActive(Id, active) {
    return this.http.get<any>(this.apiUri + Api.fund.toggleActive(this.portal.id, Id, active));
  }

  delete(Id) {
    return this.http.get<any>(this.apiUri + Api.fund.delete(this.portal.id, Id));
  }

}
