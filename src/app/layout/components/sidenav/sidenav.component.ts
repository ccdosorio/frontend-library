import { Component, OnInit } from '@angular/core';

import * as feather from 'feather-icons';

import { Navigation } from '@models';
import { AuthenticationService, SidenavService, UserService } from '@services';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  navigation: Navigation[] = [];

  constructor(
    private _sidenavService: SidenavService,
    public authenticationService: AuthenticationService,
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) { }

  signOut(): void {
    this.authenticationService.SignOut();
  }

  ngOnInit(): void {
    feather.replace();
    this.getUserNavigation();
    this._sidenavService.change.subscribe(resp => this.getUserNavigation());
  }

  getUserNavigation(): void {
    this.spinner.show();
    this.userService.getUser().subscribe({
      next: (resp) => {
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
