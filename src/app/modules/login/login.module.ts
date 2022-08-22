import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRouting } from './login.routing';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { CoreModule } from 'core/core.module';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';


@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    VerifyEmailComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    LoginRouting
  ]
})
export class LoginModule { }
