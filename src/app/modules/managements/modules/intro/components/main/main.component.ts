import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Navigation, UserInfo } from '@models';

import { NgxSpinnerService } from 'ngx-spinner';

import { AppConfigService, AuthenticationService, SidenavService, UserService } from '@services';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  navigation: Navigation[] = [];
  user: UserInfo | undefined;

  constructor(
    private appConfigService: AppConfigService,
    private _sidenavService: SidenavService,
    public authenticationService: AuthenticationService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private userService: UserService,
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
    this.spinner.show();
    this.userService.getUser().subscribe({
      next: (resp) => {
       this.user = resp;
        if (resp.authorities.length === 1) {
          this.navigationsAdmin();
        } else if (resp.authorities.length > 1) {
          resp.authorities.filter(item => {
            if (item.name === 'PROFESSOR_USER_ROLE') {
              this.navigationsTeacher();
            }
            if (item.name === 'FAMILY_USER_ROLE') {
              this.navigationsFamily();
            }
          });
        }
        this.spinner.hide();
      },
      error: (error) => {
        console.log(error);
        this.spinner.hide();
      }
    });
  }

  navigationsAdmin(): void {
    this._sidenavService.getConfigAdmin
      .subscribe((navigations) => {
        this.navigation = navigations;
      });
  }

  navigationsTeacher(): void {
    this._sidenavService.getConfigTeacher
      .subscribe((navigations) => {
        this.navigation = navigations;
      });
  }

  navigationsFamily(): void {
    this._sidenavService.getConfigFamily
      .subscribe((navigations) => {
        this.navigation = navigations;
      });
  }

}
