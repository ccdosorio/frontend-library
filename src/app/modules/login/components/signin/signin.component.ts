import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as feather from 'feather-icons';

import { AppConfigService, AuthenticationService } from '@services';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, AfterViewInit {

  formLogin: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    password: ['', [Validators.required]]
  });

  @ViewChild('inputTheme') inputTheme!: ElementRef<HTMLInputElement>;

  constructor(
    private appConfigService: AppConfigService,
    private fb: FormBuilder,
    public authenticationService: AuthenticationService
  ) {
    this.appConfigService.setConfig({
      layout: {
        generic_container: { visible: true },
        sidenav: { visible: false },
        toolbar: { visible: false }
      }
    });
  }

  ngOnInit(): void {
    feather.replace();
  }

  ngAfterViewInit(): void {
    if (localStorage.getItem('darkMode')) {
      const body = document.getElementsByTagName('body')[0];
      this.inputTheme.nativeElement.checked = false;
      body.classList.add('is-dark');
    }
  }

  login(): void {
    const { email, password } = this.formLogin.value;
    this.authenticationService.SignIn(email, password);
  }

  setTheme(): void {
    const body = document.getElementsByTagName('body')[0];

    if (body.classList.contains('is-dark')) {
      body.classList.remove('is-dark');
      localStorage.removeItem('darkMode');
    } else {
      body.classList.add('is-dark');
      localStorage.setItem('darkMode', JSON.stringify(true));
    }
  }

}
