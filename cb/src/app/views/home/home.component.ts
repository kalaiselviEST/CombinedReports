import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { WorkspaceService } from '../../_services/workspace.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private titleService: Title,
    private workspace: WorkspaceService
  ) { }

  ngOnInit() {
    this.setupInterface();
  }

  setupInterface() {
    this.titleService.setTitle("Home - ClerkBooks");
  }

}
