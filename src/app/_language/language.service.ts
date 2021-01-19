import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// languages
import * as enUS from './en-us';
import * as es from './es';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languageSbj: BehaviorSubject<any>;
  public language: Observable<any>;

  constructor() {
    this.languageSbj = new BehaviorSubject(enUS);
    this.language = this.languageSbj.asObservable();
  }

  changeLanguage(lang: string) {
    this.languageSbj.next(this.chooseLanguage(lang));
  }

  private chooseLanguage(lang: string): any {
    switch (lang.toLowerCase()) {
      case 'en-us':
        return enUS;
        case 'es':
          return es;
      default:
        return enUS;
    }
  }
}
