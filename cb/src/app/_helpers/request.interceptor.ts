import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';



@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(
    private authSvc: AuthService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const currentSession = this.authSvc.getSession();
    request = request.clone({
      headers: request.headers.set('Content-Type', 'application/json')
    })

    if (currentSession) {
      // Add authorization header for all XHR
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${currentSession}`)
      });
    }

    return next.handle(request);
  }
}
