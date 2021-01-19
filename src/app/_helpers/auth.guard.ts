import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, UrlSegment, CanActivateChild } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { AuthService } from '../_services/auth.service';
import { JwtHelper } from 'angular2-jwt';
import { RequestInterceptor } from './request.interceptor';

@Injectable({ providedIn: "root" })

export class AuthGuard implements CanActivate, CanLoad, CanActivateChild {
  private jwtHelper: JwtHelper;

  constructor(
    private router: Router,
    private authSvc: AuthService
  ) {
    this.jwtHelper = new JwtHelper();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    try {
      var currToken = this.authSvc.getSession(); //get curr user from authentication service

      if (currToken) {
        //user has valid jwt token
        if (this.jwtHelper.isTokenExpired(currToken)) {
          return AuthOps.invalidLogin(this.router, state);
        }
        else {
          return true;
        }
      }
      else {
        return AuthOps.invalidLogin(this.router, state);
      }
    } catch (err) {
      console.log(err);
      return AuthOps.invalidLogin(this.router, state);
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return true;
  }


  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return true;
  }

}

export class AdminGaurd implements CanActivate, CanLoad {
  constructor(
    private router: Router
  ) { }

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return true;
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return true;
  }
}

module AuthOps {
  export function invalidLogin(router: Router, state: RouterStateSnapshot): boolean {
    // router.navigate(['/login'], { queryParams: { retUrl: state.url, r: 'se' } });
    return true; //IMPORTANT: should be 'return false' here out of boilerplate
  }
}