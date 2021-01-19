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
export class ItemService {
  private itemSubject = new Subject<any>();
  public itemObs: Observable<any>;
  private ratesSubject = new Subject<any>();
  public ratesObs: Observable<any>;
  public items = [];
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
    this.itemObs = this.itemSubject.asObservable();
    this.ratesObs = this.ratesSubject.asObservable();

    var portal = localStorage.getItem('Portal');
    if (portal) {
      this.portal = JSON.parse(portal);
    }

  }

  broadcastItemChange() {
    this.itemSubject.next();
  }

  broadcastRatesTable(itemId, open = true) {
    console.log({itemId});
    this.ratesSubject.next({ itemId, open });
  }

  fetch(typeId, all = false) {
    if (all) {
      return this.http.get<any>(this.apiUri + Api.item.listAll(this.portal.id, typeId));

    } else {
      return this.http.get<any>(this.apiUri + Api.item.list(this.portal.id, typeId));

    }
  }

  fetchOne(Id) {
    return this.http.get<any>(this.apiUri + Api.item.fetchOne(this.portal.id, Id));
  }

  toggleActive(Id, active) {
    return this.http.get<any>(this.apiUri + Api.item.toggleActive(this.portal.id, Id, active));
  }

  fetchTypes() {
    return this.http.get<any>(this.apiUri + Api.item.types);
  }


  create(item) {
    return this.http.post<any>(this.apiUri + Api.item.create(this.portal.id), item);
  }

  update(item) {
    return this.http.post<any>(this.apiUri + Api.item.update(this.portal.id), item);
  }

  delete(Id) {
    return this.http.get<any>(this.apiUri + Api.item.delete(this.portal.id, Id));
  }

  rates(itemId) {
    return this.http.get<any>(this.apiUri + Api.item.rates(this.portal.id, itemId));
  }

  ratesUpdate(itemId, rate) {
    return this.http.post<any>(this.apiUri + Api.item.ratesUdpate(this.portal.id, itemId), rate);
  }
}
