import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {
  private footerSbj = new Subject<any>();
  private toastSbj = new Subject<any>();
  public sidemenuSbj = new Subject<any>();
  public breadcrumbSbj = new Subject<any>();

  private reqDelayTimeout: any;
  private sidemenuCollapsed = false;

  constructor() { }


  //#region Toast

  toastObs(): Observable<any> {
    return this.toastSbj.asObservable();
  }

  successToast(options: any) {
    /**
     * Show success toast to the user (Green colored)
     * @param options - options.icon, options.message, options.duration (in milliseconds)
     */

    options.icon = options.icon || 'check-circle';
    options.message = options.message || 'Success!';
    options.duration = options.duration || 4000;
    options.type = 'success';

    this.toastSbj.next(options);
  }

  infoToast(options: any) {
    /**
     * Show information toast to the user (Info colored)
     * @param options - options.icon, options.message, options.duration (in milliseconds)
     */

    options.icon = options.icon || 'info-circle';
    options.message = options.message || '';
    options.duration = options.duration || 4000;
    options.type = 'info';
    this.toastSbj.next(options);
  }

  warningToast(options: any) {
    /**
     * Show warning toast to the user (Orange/Yellow colored)
     * @param options - options.icon, options.message, options.duration (in milliseconds)
     */

    options.icon = options.icon || 'exclamation-circle';
    options.message = options.message || '';
    options.duration = options.duration || 4000;
    options.type = 'warning';
    this.toastSbj.next(options);
  }


  errorToast(options: any) {
    /**
     * Show error toast to the user (Red colored)
     * @param options - options.icon, options.message, options.duration (in milliseconds)
     */

    options.icon = options.icon || 'exclamation-circle';
    options.message = options.message || '';
    options.duration = options.duration || 5000;
    options.type = 'error';
    this.toastSbj.next(options);
  }

  //#endregion

  //#region ajax delay counters

  reqDelayToast(delay: number, options: any) {

    options.message = options.message || 'Its taking longer than usual.\nThankyou for being patient';
    options.duration = options.duration || 5000;

    this.reqDelayTimeout = setTimeout(
      () => {
        this.infoToast(options);
      }, delay
    );
  }

  clearReqdelayToast() {
    clearInterval(this.reqDelayTimeout);
  }

  //#endregion

  //#region Sidemenu
  toggleSidemenu() {
    this.sidemenuCollapsed = !this.sidemenuCollapsed;
    setTimeout(() => {
      this.sidemenuSbj.next(this.sidemenuCollapsed);
    })
    //return this.sidemenuCollapsed;
  }

  collapseSideMenu() {
    this.sidemenuCollapsed = true;
    setTimeout(() => {
      this.sidemenuSbj.next(this.sidemenuCollapsed);
    })
    //return this.sidemenuCollapsed;
  }

  expandSideMenu() {
    this.sidemenuCollapsed = false;
    setTimeout(() => {
      this.sidemenuSbj.next(this.sidemenuCollapsed);
    })

    //return this.sidemenuCollapsed;
  }
  //#endregion


  //#region Breadcrumbs
  breadcrumbObs(): Observable<any> {
    return this.breadcrumbSbj.asObservable();
  }

  setBreadcrumb(menuItems: any[]): void {
    this.breadcrumbSbj.next(menuItems);
  }

  //#endregion
}
