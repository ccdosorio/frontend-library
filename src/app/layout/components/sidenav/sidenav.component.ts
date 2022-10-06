import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import * as feather from 'feather-icons';

import { Navigation } from '@models';
import { AuthenticationService, SidenavService, UserService } from '@services';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, AfterViewInit {

  navigation: Navigation[] = [];
  @ViewChild('inputTheme') inputTheme!: ElementRef<HTMLInputElement>;
  isOpenPanel: boolean = false;

  constructor(
    private _sidenavService: SidenavService,
    public authenticationService: AuthenticationService,
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    feather.replace();
    this.getUserNavigation();
    this._sidenavService.change.subscribe(_ => this.getUserNavigation());
  }

  ngAfterViewInit(): void {
    if (localStorage.getItem('darkMode')) {
      const body = document.getElementsByTagName('body')[0];
      this.inputTheme.nativeElement.checked = false;
      body.classList.add('is-dark');
    }
  }

  signOut(): void {
    this.authenticationService.SignOut();
  }

  getUserNavigation(): void {    
    this.spinner.show();
    this.userService.getUser().subscribe({
      next: (resp) => {
        if (resp.authorities.length === 1) {
          localStorage.setItem('rol', 'BASIC_USER_ROLE');
          this.navigationsAdmin();
        } else if (resp.authorities.length > 1) {
          resp.authorities.filter(item => {
            if (item.name === 'PROFESSOR_USER_ROLE') {
              localStorage.setItem('rol', 'PROFESSOR_USER_ROLE');
              this.navigationsTeacher();
            }
            if (item.name === 'FAMILY_USER_ROLE') {
              localStorage.setItem('rol', 'FAMILY_USER_ROLE');
              this.navigationsFamily();
            }
          });
        }
        this.spinner.hide();
      },
      error: _ => {
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

  setTheme(): void {
    const body = document.getElementsByTagName('body')[0];

    if (body.classList.contains('is-dark')) {
      body.classList.remove('is-dark');
      localStorage.removeItem('darkMode');
    } else {
      body.classList.add('is-dark');
      localStorage.setItem('darkMode', JSON.stringify(true));
    }
  }

  openPanel(): void {
    this.isOpenPanel = !this.isOpenPanel;
  }
}
