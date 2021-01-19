import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WorkspaceService } from 'src/app/_services/workspace.service';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/_services/item.service';
import { finalize } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'coa-groups',
  templateUrl: './coa-groups.component.html',
  styleUrls: ['./coa-groups.component.css']
})
export class ItemsComponent implements OnInit {

  @ViewChild('tbody', { static: false }) private tbody: ElementRef;
  newGroupUrl = "./new";
  isListLoading = true;
  groupTypes = [];
  selectedGroupType = {
    id: '',
    name: 'All',
    text: 'All'
  };

  showInactive = false;
  searchKey = '';
  searchSbj = new Subject<any>();
  searchTimeout = null;
  searchLoading = false;

  constructor(
    private router: Router,
    public itemSvc: ItemService
  ) {
    this.groupTypes.push(
      {
        id: '',
        name: 'All',
        text: 'All'
      }
    );
  }

  ngOnInit() {    
    this.fetchGroupTypes();
    // this.fetchGroups(); //calling inside fetchGroupTypes due to dependency
    this.itemSvc.itemObs.subscribe(() => {
      this.fetchGroups();
    })
  }

  fetchGroups() {
    this.isListLoading = true;
    this.itemSvc.fetch(this.selectedGroupType.id, this.showInactive).pipe(
      finalize(() => {
        this.isListLoading = false;
      })
    ).subscribe(res => {
      this.itemSvc.items = res.data;

      if (res.data.length > 0)
        this.stripColorRows();
    },
      err => {
        console.log(err);
      })
  }

  fetchGroupTypes() {
    this.itemSvc.fetchTypes().pipe(
      finalize(() => {
        this.fetchGroups();
      })
    ).subscribe(res => {
      this.groupTypes = res.data.filter(x => !x.parentID);

      this.groupTypes.unshift({
        id: '',
        name: 'All'
      });
      this.groupTypes.map(x => x.text = x.name);

      this.selectedGroupType = this.groupTypes[0] || {
        id: '',
        name: 'ERR',
        text: 'ERR'
      };

    },
      err => {
        this.groupTypes = [{
          id: '',
          name: 'ERR',
          text: 'ERR'
        }];
        console.log(err);
      })
  }

  ratesTable(e) {
    this.router.navigate(['/groups/rates-table']);
    e.stopPropagation();
  }

  selectGroupType(type) {
    this.selectedGroupType = type;
    this.fetchGroups();
  }

  stripColorRows() {
    setTimeout(() => {
      if (!this.tbody) return;
      var rows = this.tbody.nativeElement.querySelectorAll('.table-row');
      for (var i = 0; i < rows.length; i++) {
        if (i % 2 == 0)
          rows[i].classList.add('even');
        else
          rows[i].classList.remove('even');
      }
    }, 1000);
  }

  sendSearch() {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.searchSbj.next(this.searchKey);
      this.searchLoading = true;
      setTimeout(() => {
        this.searchLoading = false;
      }, 1000);
    }, 1000);
  }

}
