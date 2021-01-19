import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { WorkspaceService } from '../_services/workspace.service';

@Component({
  selector: 'app-master-template',
  templateUrl: './master-template.component.html',
  styleUrls: ['./master-template.component.css']
})
export class MasterTemplateComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  sidemenuCollapsed = false;

  footerClass: string = '';

  constructor(
    private workspace: WorkspaceService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.subscribeToSidemenu();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  subscribeToSidemenu() {
    this.subscription = this.workspace.sidemenuSbj.subscribe(
      state => { this.sidemenuCollapsed = state; }
    )
  }

}
