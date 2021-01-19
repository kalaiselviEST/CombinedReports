import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from 'src/app/_services/workspace.service';
import { ActivatedRoute, NavigationEnd, Router, Params } from '@angular/router';
import { isNullOrUndefined } from 'util';
import 'rxjs/add/operator/filter';
import { Title } from '@angular/platform-browser';
import { menuItems } from 'src/app/app.globals';
import * as AppGlobals from '../../app.globals';

interface IBreadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumbs',
  styleUrls: ['./breadcrumbs.component.css'],
  templateUrl: './breadcrumbs.component.html'
})
export class BreadcrumbsComponent implements OnInit {

  menuItems;
  public breadcrumbs: IBreadcrumb[];

  constructor(
    private workspace: WorkspaceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleSvc: Title
  ) {
    this.router.events.filter(event => event instanceof NavigationEnd)
      .subscribe(event => {
        this.menuItems = this.createBreadcrumbs(this.activatedRoute.root);
        if (this.menuItems.length > 0) {
          this.titleSvc.setTitle(`${this.menuItems[this.menuItems.length - 1].label} - ${AppGlobals.appInfo.name}`);
        }
        else{
          this.titleSvc.setTitle(`${AppGlobals.appInfo.name}`);
        }
      });
  }

  ngOnInit() {

  }

  subscribeToService() {
    this.workspace.breadcrumbObs().subscribe(items => {
      items.array.forEach(item => {

      });
    })
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: any[] = []): any[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data["breadcrumb"];
      const title = child.snapshot.data["title"];
      if (!isNullOrUndefined(label)) {
        breadcrumbs.push({ title, label, url });
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
  }

}
