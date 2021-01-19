import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import * as AppGlobals from '../app.globals';
import { environment } from 'src/environments/environment';
import { Api } from '../_helpers/api';
import { map } from 'rxjs/operators';
import { JwtHelper } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class PortalService {
  private stepSubject = new Subject<any>();
  private apiUri: string;
  private jwtHelper: JwtHelper

  constructor(
    private authSvc: AuthService,
    private http: HttpClient
  ) {

    this.jwtHelper = new JwtHelper();

    this.apiUri = environment.apiBase;
  }

  fetch() {

    let session = this.authSvc.getSession();
    let userId = this.jwtHelper.decodeToken(session).sub;
    return this.http.get<any>(this.apiUri + Api.portal.list(userId));
  }

  load(portal) {
    return this.http.get<any>(this.apiUri + Api.portal.load(portal));
  }

}
