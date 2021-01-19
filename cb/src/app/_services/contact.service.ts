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
export class ContactService {
  private contactSubject = new Subject<any>();
  public contactObs: Observable<any>;
  public basicInfoSave = new Subject<any>();
  private ratesSubject = new Subject<any>();
  public ratesObs: Observable<any>;
  public contacts = [];
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
    this.contactObs = this.contactSubject.asObservable();
    this.ratesObs = this.ratesSubject.asObservable();

    var portal = localStorage.getItem('Portal');
    if (portal) {
      this.portal = JSON.parse(portal);
    }

  }

  broadcastContactChange() {
    this.contactSubject.next();
  }

  broadcastBasicInfoSave() {
    this.basicInfoSave.next();
  }

  fetch(typeId, all = false) {
    if (all) {
      return this.http.get<any>(this.apiUri + Api.contact.listAll(this.portal.id, typeId));

    } else {
      return this.http.get<any>(this.apiUri + Api.contact.list(this.portal.id, typeId));

    }
  }

  fetchOne(Id) {
    return this.http.get<any>(this.apiUri + Api.contact.fetchOne(this.portal.id, Id));
  }

  toggleActive(Id, active) {
    return this.http.get<any>(this.apiUri + Api.contact.toggleActive(this.portal.id, Id, active));
  }

  create(contact) {
    return this.http.post<any>(this.apiUri + Api.contact.create(this.portal.id), contact);
  }

  update(contact) {
    return this.http.post<any>(this.apiUri + Api.contact.update(this.portal.id), contact);
  }

  delete(Id) {
    return this.http.get<any>(this.apiUri + Api.contact.delete(this.portal.id, Id));
  }

}
