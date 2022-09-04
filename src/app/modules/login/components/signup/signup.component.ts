import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as feather from 'feather-icons';

import { AppConfigService, AuthenticationService } from '@services';
import { ValidatePassword } from "@helpers";
import { StepperSelectionEvent } from '@angular/cdk/stepper';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  formRegister: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]] // password_confirm
  }, {
    validator: ValidatePassword.MatchPassword
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

  register(): void {
    const { email, password, name } = this.formRegister.value;
    this.authenticationService.SignUp(email, password, name);
  }

  ngOnInit(): void {
    feather.replace();
  }

}
