import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as feather from 'feather-icons';

import { AppConfigService, AuthenticationService, UserService } from '@services';
import { ValidatePassword } from "@helpers";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  invitationUuid: number = 0;

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
    public authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private userService: UserService
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

  getInvitation(): void {
    this.userService.getUserInvitations(this.invitationUuid).subscribe({
      next: (resp) => {
        this.formRegister.get('name')?.setValue(resp.name);
        this.formRegister.get('name')?.disable();
        this.formRegister.get('email')?.setValue(resp.email_address);
        this.formRegister.get('email')?.disable();
      },
      error: (error) => console.log(error),
    })
  }

  ngOnInit(): void {
    feather.replace();
    this.route.params.subscribe((params) => {
      if (Object.keys(params).length > 0) {
        this.invitationUuid = params['uuid'];
        this.getInvitation();
      }
    });
  }
}
