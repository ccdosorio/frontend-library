import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NgxSpinnerService } from "ngx-spinner";

import { AppConfigService } from '@services';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  formLogin: FormGroup = this.fb.group({
    email: ['', [ Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$') ]],
    password: ['', [ Validators.required ]]
  });

  constructor(
    private appConfigService: AppConfigService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder
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
    console.log('login');
    console.log(this.formLogin.value);
    
    this.spinner.show();

    this.router.navigate(['/Managements'])

    setTimeout(() => {
      this.spinner.hide();
    }, 2000);

  }

  ngOnInit(): void {
  }

}
