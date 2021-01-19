import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemService } from 'src/app/_services/item.service';
import { Router } from '@angular/router';
import { WorkspaceService } from 'src/app/_services/workspace.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'coa-groups-row',
  templateUrl: './coa-groups-row.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsRowComponent implements OnInit {
  @Input() parentID = null;
  @Input() isSearch = false;
  @Input() searchObs: Observable<any> = null;
  searchKey = '';
  filtered = [];

  constructor(
    private router: Router,
    public itemSvc: ItemService,
    private ref: ChangeDetectorRef,
    private workspace: WorkspaceService
  ) { }

  ngOnInit() {
    this.filterGroups('');
    if (this.searchObs != null) {
      this.searchObs.subscribe(s => {
        this.searchKey = s;
        this.filterGroups(s);
      })
    }
  }

  filterGroups(searchKey) {
    if (searchKey.trim() != '') {
      this.filtered = this.itemSvc.items.filter(x => x.name.toLowerCase().indexOf(searchKey) > -1 || x.description.toLowerCase().indexOf(searchKey) > -1);
      this.isSearch = true;
    } else {
      this.isSearch = false;
      if (this.parentID) {
        //Use setTimeout so Angular has gaps in between to keep the UI un-frozen
        setTimeout(() => {
          this.filtered = this.itemSvc.items.filter(x => x.parentID == this.parentID);
          this.ref.detectChanges();
        }, 100);

      } else {
        this.isSearch = false;
        this.filtered = this.itemSvc.items.filter(x => x.parentID == this.parentID);
      }
    }
  }

  toggleActive(group) {
    group.isActive = !group.isActive;
    group.isLoading = true;
    this.itemSvc.toggleActive(group.id, group.isActive).pipe(
      finalize(() => {
        group.isLoading = false;
        this.ref.detectChanges();
      })
    ).subscribe(res => {
      //200 means it was successfull
      group.isLoading = false;
      if (res.statusCode != 200) {
        group.isActive = !group.isActive;
      }

      if (res.statusCode == 422) {
        this.workspace.warningToast({
          message: 'Group has active children'
        })
      }
    },
      err => {
        //revert back if failed
        group.isActive = !group.isActive;
        group.isLoading = false;
      })
  }

  hasChildren(group): boolean {
    return this.itemSvc.items.filter(x => x.parentID == group.id).length > 0;
  }

  deleteConfirm(group) {
    group.isDeleting = true;
  }

  deleteGroup(group, i) {
    group.isLoading = true;
    this.itemSvc.delete(group.id).pipe(
      finalize(() => {
        group.isLoading = false;
        group.isDeleting = false;
      })
    ).subscribe(res => {

      if (res.statusCode == 422) {
        this.workspace.warningToast({
          message: 'Group has children'
        })
      }

      //200 denotes it was successfull
      if (res.statusCode == 200) {
        this.filtered.splice(i, 1);
        this.ref.detectChanges();
      }
    },
      err => {
        group.isLoading = false;
      })
  }

  ratesTable(id) {
    this.itemSvc.broadcastRatesTable(id);
  }
}
