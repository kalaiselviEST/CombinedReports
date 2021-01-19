import { Component, OnInit, OnDestroy } from '@angular/core';
import * as AppGlobals from '../../app.globals';
import { WorkspaceService } from 'src/app/_services/workspace.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit, OnDestroy {

  menuItems = [];
  companyName = "Dunham Enterprise";
  sidemenuCollapsed = false;
  private subscription: Subscription;
  portal: {
    id: string,
    displayName: string,
    legalName: string
  };

  constructor(
    private workspace: WorkspaceService,
    private authSvc: AuthService,
    private router: Router
  ) {
    this.portal = {
      id: '',
      displayName: 'Portal Name',
      legalName: 'Portal Legal'
    }
  }

  ngOnInit() {
    this.menuItems = AppGlobals.menuItems;
    this.subscribeToSidemenu();
    this.loadPortal();
  }

  loadPortal() {
    var portal = localStorage.getItem('Portal');
    if (portal) {
      this.portal = JSON.parse(portal);
    }
  }

  toggleSidemenu() {
    this.workspace.toggleSidemenu();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  subscribeToSidemenu() {
    this.subscription = this.workspace.sidemenuSbj.subscribe(
      state => { this.sidemenuCollapsed = state; }
    )
  }

  getTooltip(item) {
    if (this.sidemenuCollapsed) {
      return item.text;
    }
    else {
      return '';
    }
  }

  logout() {
    this.authSvc.logout();
    this.router.navigate(['/login']);
  }
}
