import { Component, OnInit } from '@angular/core';
import { Navigation } from '@models';

import { AppConfigService, SidenavService } from '@services';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  navigation: Navigation[] = [];

  constructor(
    private appConfigService: AppConfigService,
    private _sidenavService: SidenavService
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
    this._sidenavService.getConfigAdmin
    .subscribe((navigations) => {
      this.navigation = navigations;
    })
   }

}
