import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import * as AppGlobals from './app.globals';

import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './login/login.component';
import { MasterTemplateComponent } from './master-template/master-template.component';
import { AuthGuard } from './_helpers/auth.guard';

import { MemTxnRoutes } from './routes/mem-txn.routing';
import { HomeRoutes } from './routes/home.routing';
import { ContactsRoutes } from './routes/contacts.routing';
import { PropertiesRoutes } from './routes/properties.routing'
import { CoaRoutes } from './routes/coa.routing';
import { SelectPortalComponent } from './login/select-portal/select-portal.component';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'selectportal',
    component: SelectPortalComponent
  }
];

const masterRoutes: Routes = [
  {
    path: '',
    component: MasterTemplateComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full', data: { breadcrumb: null } },
      HomeRoutes,
      MemTxnRoutes,
      ContactsRoutes,
      PropertiesRoutes,
      CoaRoutes,
      AppGlobals.invalidRoute
    ],
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),
    RouterModule.forChild(masterRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouterModule { }
