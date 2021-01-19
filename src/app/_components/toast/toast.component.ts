import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from 'src/app/_services/workspace.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  icon = 'info';
  message = '';
  type = '';
  duration = 2000;
  shown = false;
  offset = '0px';

  private timeoutIndex;

  constructor(
    private workspace: WorkspaceService
  ) { }

  ngOnInit() {
    // Subscribe to toast service observable to show toast throughout the application
    this.workspace.toastObs().subscribe(res => {
      // res = res.options; // reassign options param
      console.log(res);
      this.icon = res.icon;
      this.message = res.message;
      this.type = res.type === 'error' ? 'danger' : res.type;
      this.duration = res.duration;
      this.offset = `${res.offset}px`;
      this.shown = (this.message !== '');
      clearTimeout(this.timeoutIndex);
      this.timeoutIndex = setTimeout(() => this.resetToast(this), this.duration);
    });
  }

  resetToast(instance) {
    // Reset toast once time is up
    instance.shown = false;
    instance.icon = 'info';
    instance.message = '';
    instance.type = 'info';
    instance.duration = 2000;
  }

}
