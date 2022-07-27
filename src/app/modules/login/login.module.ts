import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRouting } from './login.routing';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';


@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    LoginRouting
  ]
})
export class LoginModule { }
