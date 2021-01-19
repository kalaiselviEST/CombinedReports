import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from 'src/app/_services/workspace.service';

@Component({
  selector: 'properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {

  isContactsListMini = true;
  formEditable = false;

  constructor(
    private workspace: WorkspaceService
  ) { }

  ngOnInit() {
    this.workspace.collapseSideMenu();
  }

}
