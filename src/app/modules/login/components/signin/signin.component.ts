import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppConfigService, AuthenticationService } from '@services';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  formLogin: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    password: ['', [Validators.required]]
  });

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

  login(): void {
    const { email, password } = this.formLogin.value;
    this.authenticationService.SignIn(email, password);
  }

  ngOnInit(): void {
  }

}
