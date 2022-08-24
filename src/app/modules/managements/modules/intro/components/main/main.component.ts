import { Component, OnInit } from '@angular/core';
import { Navigation } from '@models';

import { AppConfigService, AuthenticationService, SidenavService } from '@services';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  navigation: Navigation[] = [];

  constructor(
    private appConfigService: AppConfigService,
    private _sidenavService: SidenavService,
    public authenticationService: AuthenticationService
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
    });
   }

}
