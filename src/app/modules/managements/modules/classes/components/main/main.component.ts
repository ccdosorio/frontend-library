import { Component, OnInit } from '@angular/core';

import { NgxSpinnerService } from "ngx-spinner";

import { AppConfigService } from '@services';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  actionButton: string = 'Add';

  constructor(
    private appConfigService: AppConfigService,
    private spinner: NgxSpinnerService
  ) {
    this.appConfigService.setConfig({
      layout: {
        generic_container: { visible: false },
        sidenav: { visible: true },
        toolbar: { visible: false }
      }
    });
  }

  ngOnInit(): void {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

  addClass(): void {
    console.log('add');
    
  }

}
