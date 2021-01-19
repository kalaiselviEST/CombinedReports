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
export class AccountService {
  private accountSubject = new Subject<any>();
  public accountObs: Observable<any>;
  public accounts = [];
  public currentID = null;
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
    this.accountObs = this.accountSubject.asObservable();
    var portal = localStorage.getItem('Portal');
    if (portal) {
      this.portal = JSON.parse(portal);
    }

  }

  broadcastAccountChange() {
    this.accountSubject.next();
  }

  fetch(typeId, all = false) {
    if (all) {
      return this.http.get<any>(this.apiUri + Api.account.listAll(this.portal.id, typeId));
    } else {
      return this.http.get<any>(this.apiUri + Api.account.list(this.portal.id, typeId));
    }
  }

  fetchOne(accId) {
    return this.http.get<any>(this.apiUri + Api.account.fetchOne(this.portal.id, accId));
  }

  fetchChildren(parentId) {
    return this.http.get<any>(this.apiUri + Api.account.listChildren(this.portal.id, parentId));
  }

  toggleActive(Id, active) {
    return this.http.get<any>(this.apiUri + Api.account.toggleActive(this.portal.id, Id, active));
  }

  fetchTypes() {
    return this.http.get<any>(this.apiUri + Api.account.types);
  }

  fetchBoxW2() {
    return this.http.get<any>(this.apiUri + Api.account.boxW2);
  }

  fetchBox1099() {
    return this.http.get<any>(this.apiUri + Api.account.box1099);
  }

  create(account) {
    return this.http.post<any>(this.apiUri + Api.account.create(this.portal.id), account);
  }

  update(account) {
    return this.http.post<any>(this.apiUri + Api.account.update(this.portal.id), account);
  }

  delete(Id) {
    return this.http.get<any>(this.apiUri + Api.account.delete(this.portal.id, Id));
  }

}
