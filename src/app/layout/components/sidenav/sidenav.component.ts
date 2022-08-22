import { Component, OnInit } from '@angular/core';

import { Navigation } from '@models';
import { AuthenticationService, SidenavService } from '@services';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  navigation: Navigation[] = [];
  
  constructor( 
    private _sidenavService: SidenavService,
    public authenticationService: AuthenticationService
  ) { }

  signOut(): void {
    this.authenticationService.SignOut();
   }

  ngOnInit(): void { 
    this._sidenavService.getConfigAdmin
    .subscribe((navigations) => {      
      this.navigation = navigations;
    })
  }
}
