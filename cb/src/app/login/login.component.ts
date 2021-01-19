import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from 'src/app/_language/language.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../_services/auth.service';
import { Ui, Messages } from 'src/app/_language/en-US/login';
import { Session } from '../_models/session';
import { JwtHelper } from 'angular2-jwt';
import { finalize } from 'rxjs/operators';
import * as AppGlobals from '../app.globals';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;
  keepSession: FormControl;

  appInfo = AppGlobals.appInfo;

  session: string = null;
  sessionExists = false;
  sessionValidating = true;

  formIsSubmitting = false;
  invalidLogin = false;

  loginFormData: LoginComponent;

  ui: Ui;
  messages: Messages;
  common: any;
  private jwtHelper: JwtHelper
  constructor(
    private titleService: Title,
    private cookieSvc: CookieService,
    private authSvc: AuthService,
    private languageSvc: LanguageService,
    private route: ActivatedRoute,
    private router: Router

  ) {

    this.jwtHelper = new JwtHelper();
  }

  ngOnInit() {
    this.titleService.setTitle(`Login - ClerkBooks`);
    this.checkExistingSession();
    this.createFormGroup();
    this.createForm();
  }


  checkExistingSession() {
    this.session = this.authSvc.getSession();
    if (this.session) {
      console.log(this.session);
      this.sessionExists = !this.jwtHelper.isTokenExpired(this.session);
    } else {
      this.sessionExists = false;
    }
  }

  createFormGroup() {
    this.email = new FormControl('');
    this.password = new FormControl('');
    this.keepSession = new FormControl('')

    this.email.setValidators([
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9.!#$%&'* +/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    ]);

    this.password.setValidators([
      Validators.required
    ]);

    this.email.updateValueAndValidity();
    this.password.updateValueAndValidity();
  }

  createForm() {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
      keepSession: this.keepSession
    });
  }

  submitForm() {

    this.formIsSubmitting = true;

    if (this.loginForm.valid) {
      this.authSvc.login(this.email.value, this.password.value, this.keepSession.value).pipe(
        finalize(() => {
          this.formIsSubmitting = false;
        })
      )
        .subscribe(
          data => {
            this.formIsSubmitting = false;
            this.router.navigate(['/selectportal']);
          },
          err => {
            this.invalidLogin = true;
            this.formIsSubmitting = false;
          });
    }
  }

}