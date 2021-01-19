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
export class DepartmentService {
  private departmentSubject = new Subject<any>();
  public departmentObs: Observable<any>;
  public departments = [];
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

    this.departmentObs = this.departmentSubject.asObservable();
  }

  broadcastDepartmentChange() {
    this.departmentSubject.next();
  }

  fetch(all = false) {
    if (all) {
      return this.http.get<any>(this.apiUri + Api.department.listAll(this.portal.id));
    }
    else {
      return this.http.get<any>(this.apiUri + Api.department.list(this.portal.id));
    }
  }

  fetchOne(departmentId) {
    return this.http.get<any>(this.apiUri + Api.department.fetchOne(this.portal.id, departmentId));
  }

  create(department) {
    return this.http.post<any>(this.apiUri + Api.department.create(this.portal.id), department);
  }

  update(department) {
    return this.http.post<any>(this.apiUri + Api.department.update(this.portal.id), department);
  }

  toggleActive(Id, active) {
    return this.http.get<any>(this.apiUri + Api.department.toggleActive(this.portal.id, Id, active));
  }

  delete(Id) {
    return this.http.get<any>(this.apiUri + Api.department.delete(this.portal.id, Id));
  }

}
