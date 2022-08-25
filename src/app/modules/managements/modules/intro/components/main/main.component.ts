import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    public authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.appConfigService.setConfig({
      layout: {
        generic_container: { visible: false },
        sidenav: { visible: true },
        toolbar: { visible: false }
      }
    });
  }

  selectCard(card: any): void {
    if (card.route != undefined) {
      this.router.navigate([card.route]);
    }
  }

  ngOnInit(): void {
    this._sidenavService.getConfigAdmin
      .subscribe((navigations) => {
        this.navigation = navigations;
      });
  }

}
