import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgxSpinnerService } from "ngx-spinner";

import { AppConfigService } from '@services';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(
    private appConfigService: AppConfigService,
    private router: Router,
    private spinner: NgxSpinnerService
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

    /** spinner starts on init */
    this.spinner.show();

    this.router.navigate(['/Managements'])

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
    
  }

  ngOnInit(): void {
  }

}
