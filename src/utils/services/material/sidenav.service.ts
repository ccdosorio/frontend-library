import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Navigation } from '@models';
import { BehaviorSubject, Observable } from 'rxjs';

// Create the injection token for the custom adminNavigation
export const ADMIN_NAVIGATION = new InjectionToken('appAdminNavigation');
export const USER_NAVIGATION = new InjectionToken('appUserNavigation');

const navigation: Navigation[] = [];

@Injectable({ providedIn: 'root' })
export class SidenavService {

  public navigationAdminSubject: BehaviorSubject<Navigation[]> = new BehaviorSubject(navigation);
  public navigationUserSubject: BehaviorSubject<Navigation[]> = new BehaviorSubject(navigation);

  private navigationsAdmin: Navigation[];
  private navigationsUser: Navigation[];

  constructor(
    @Inject(ADMIN_NAVIGATION) private adminNavigation: Navigation[],
    @Inject(USER_NAVIGATION) private userNavigation: Navigation[]
  ) {
    this.navigationsAdmin = adminNavigation;
    this.navigationsUser = userNavigation;
    this._initAdmin();
    this._initUser();
  }

  get getConfigAdmin(): Observable<any> {
    return this.navigationAdminSubject.asObservable();
  }

  private _initAdmin(): void {
    this.navigationAdminSubject = new BehaviorSubject<any[]>(this.navigationsAdmin);
  }

  get getConfigUser(): Observable<any> {
    return this.navigationUserSubject.asObservable();
  }

  private _initUser(): void {
    this.navigationUserSubject = new BehaviorSubject<any[]>(this.navigationsUser);
  }

}
