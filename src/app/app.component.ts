import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  languageSwitchEnabled = false;

  constructor() { }

  ngOnInit() {
    this.languageSwitchEnabled = environment.ui.showLanguageSwitch;
  }

}
