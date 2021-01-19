import { Component, OnInit } from '@angular/core';
import { PortalService } from 'src/app/_services/portal.service';
import { finalize } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { JwtHelper } from 'angular2-jwt';

@Component({
  selector: 'select-portal',
  templateUrl: './select-portal.component.html',
  styleUrls: ['./select-portal.component.css']
})
export class SelectPortalComponent implements OnInit {

  portals: [];
  portalsLoading = true;
  userClaims;
  private jwtHelper: JwtHelper;
  portalSelected= false;

  constructor(private titleService: Title,
    private portalSvc: PortalService,
    private router: Router,
    private authSvc: AuthService) {
    this.jwtHelper = new JwtHelper();
  }

  ngOnInit() {
    this.titleService.setTitle(`Select Portal - ClerkBooks`);
    this.loadSession();
    this.listPortals();
  }

  loadSession() {
    let session = this.authSvc.getSession();
    if (session) {
      this.userClaims = this.jwtHelper.decodeToken(session);
    } else {
      this.router.navigate(['/login']);
    }
  }

  listPortals() {
    this.portalsLoading = true;

    this.portalSvc.fetch().pipe(
      finalize(() => {
        this.portalsLoading = false;
      })
    ).subscribe(res => {
      if (res) {
        console.log(res);
        this.portals = res.data;
      }
    },
      err => {
        if (err.status == 401) {
          this.router.navigate(['/login']);
        }
        console.warn(err);
      });
  }

  loadPortal(portal) {
    this.portalSelected = true;

    this.portalSvc.load(portal.id).pipe(
      finalize(() => {
        this.portalSelected = false;
      })
    ).subscribe(res => {
      if (res) {
        //Store selected portal details in localstorage
        localStorage.setItem('Portal', JSON.stringify({
          id: portal.id,
          displayName: portal.displayName,
          legalName: portal.legalName
        }));

        this.router.navigate(['/']);
      }
    },
      err => {
        console.warn(err);
      });


  }

}
