import { Component, OnInit } from '@angular/core';
import { LanguageService } from './language.service';
import * as AppGlobals from '../app.globals';

@Component({
  selector: 'app-language-switch',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {

  selectedLang: { text: string, code: string };
  languages: { text: string, code: string }[];

  constructor(
    private languageSvc: LanguageService
  ) {
    this.languages = AppGlobals.languages;
    this.selectedLang = {
      text: this.languages[0].text,
      code: this.languages[0].code
    }

    this.subscribeToLanguage();
  }

  ngOnInit() {
  }

  subscribeToLanguage() {
    this.languageSvc.language.subscribe(lg => {
      this.selectedLang.code = lg.code;
      this.selectedLang.text = this.languages.filter(x => x.code === lg.code)[0].text;
    });
  }

  changeLang(code: string) {
    this.languageSvc.changeLanguage(code);
  }
}
