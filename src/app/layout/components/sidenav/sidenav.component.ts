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
        this.getUserProfile();
        if (resp.authorities.length === 1) {
          localStorage.setItem('rol', 'BASIC_USER_ROLE');
        } else if (resp.authorities.length > 1) {
          resp.authorities.filter(item => {
            if (item.name === 'PROFESSOR_USER_ROLE') {
              localStorage.setItem('rol', 'PROFESSOR_USER_ROLE');
            }
            if (item.name === 'FAMILY_USER_ROLE') {
              localStorage.setItem('rol', 'FAMILY_USER_ROLE');
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

  getUserProfile(): void {
    this.userService.getUserProfile()
      .subscribe({
        next: (resp) => {
          if (resp.is_child && !resp.is_student && !resp.is_parent && !resp.is_professor) {
            // menu 1: hijo
            this.navigationsStudent();
          } else if (!resp.is_child && resp.is_student && !resp.is_parent && !resp.is_professor) {
            // menu 1: estudiante
            this.navigationsStudent();
          } else if (!resp.is_child && !resp.is_student && resp.is_parent && !resp.is_professor) {
            // menu 2: padre
            this.navigationsFamily();
          } else if (!resp.is_child && !resp.is_student && !resp.is_parent && resp.is_professor) {
            // menu 3: profesor
            this.navigationsTeacher();
          } else if (resp.is_child && resp.is_student && !resp.is_parent && resp.is_professor) {
            // menu 4: profesor, estudiante, hijo
            this.navigationsAdmin();  
          } else if (!resp.is_child && resp.is_student && !resp.is_parent && resp.is_professor) {
            // menu 4: profesor, estudiante
            this.navigationsAdmin();            
          } else if (resp.is_child && !resp.is_student && !resp.is_parent && resp.is_professor) {
            // menu 4: profesor, hijo
            this.navigationsAdmin();  
          } else if (resp.is_child && resp.is_student && resp.is_parent && !resp.is_professor) {
            // menu 5: padre, hijo, estudiante
            this.navigationsAdminFamily();
          } else if (resp.is_child && !resp.is_student && resp.is_parent && !resp.is_professor) {
            // menu 5: padre, hijo
            this.navigationsAdminFamily();
          } else if (!resp.is_child && !resp.is_student && resp.is_parent && !resp.is_professor) {
            // menu 5: padre, estudiante
            this.navigationsAdminFamily();
          }
          this.spinner.hide();

        }, error: (error) => {
          console.log(error);
          this.spinner.hide();
        }
      })
  }

  navigationsAdmin(): void {
    this._sidenavService.getConfigAdmin
      .subscribe((navigations) => {
        this.navigation = navigations;
      });
  }

  navigationsAdminFamily(): void {
    this._sidenavService.getConfigAdminFamily
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

  navigationsStudent(): void {
    this._sidenavService.getConfigStudent
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
