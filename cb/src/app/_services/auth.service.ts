import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Session } from '../_models/session';

import { Api } from '../_helpers/api';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import * as AppGlobals from '../app.globals';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private sessionSbj: BehaviorSubject<string>;
  public session: Observable<string>;
  //#region Variable Declarations
  private apiUri: string;
  //#endregion

  constructor(
    private http: HttpClient
  ) {
    const sessionStorage = localStorage.getItem('Session');

    try {
      if (sessionStorage) {
        this.sessionSbj = new BehaviorSubject<string>(JSON.parse(sessionStorage));
      } else {
        this.sessionSbj = new BehaviorSubject<string>(null);
      }
    } catch (error) {
      this.sessionSbj = new BehaviorSubject<string>(null);
    }

    this.apiUri = environment.apiBase;
    this.session = this.sessionSbj.asObservable();
  }

  public getSession(): string {
    return this.sessionSbj.value;
  }

  login(email: string, password: string, keepSession: boolean) {

    keepSession = keepSession || false;

    return this.http.post<any>(this.apiUri + Api.auth.login, { email, password, keepSession })
      .pipe(map(session => {

        if (session) {

          localStorage.setItem('Session', JSON.stringify(session.value.data));
          this.sessionSbj.next(session.value.data);
        }

        return session;
      }));
  }

  validateSession(session: string): Observable<any> {
    return this.http.post<any>(Api.auth.validateSesssion, { access_token: session });
  }

  logout() {
    localStorage.removeItem('Session');
    this.sessionSbj.next(null);
  }


}
