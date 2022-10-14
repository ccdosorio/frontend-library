import { EventEmitter, Inject, Injectable, InjectionToken, Output } from '@angular/core';
import { Navigation } from '@models';
import { BehaviorSubject, Observable } from 'rxjs';

// Create the injection token for the custom adminNavigation
export const ADMIN_NAVIGATION = new InjectionToken('appAdminNavigation');
export const TEACHER_NAVIGATION = new InjectionToken('appTeacherNavigation');
export const FAMILY_NAVIGATION = new InjectionToken('appFamilyNavigation');
export const STUDENT_NAVIGATION = new InjectionToken('appStudentNavigation');
export const ADMIN_FAMILY_NAVIGATION = new InjectionToken('appAdminFamilyNavigation');

const navigation: Navigation[] = [];

@Injectable({ providedIn: 'root' })
export class SidenavService {

  public navigationAdminSubject: BehaviorSubject<Navigation[]> = new BehaviorSubject(navigation);
  public navigationTeacherSubject: BehaviorSubject<Navigation[]> = new BehaviorSubject(navigation);
  public navigationFamilySubject: BehaviorSubject<Navigation[]> = new BehaviorSubject(navigation);
  public navigationStudentSubject: BehaviorSubject<Navigation[]> = new BehaviorSubject(navigation);
  public navigationAdminFamilySubject: BehaviorSubject<Navigation[]> = new BehaviorSubject(navigation);

  private navigationsAdmin: Navigation[];
  private navigationsTeacher: Navigation[];
  private navigationsFamily: Navigation[];
  private navigationsStudent: Navigation[];
  private navigationsAdminFamily: Navigation[];

  @Output() change: EventEmitter<boolean> = new EventEmitter();

  constructor(
    @Inject(ADMIN_NAVIGATION) private adminNavigation: Navigation[],
    @Inject(TEACHER_NAVIGATION) private teacherNavigation: Navigation[],
    @Inject(FAMILY_NAVIGATION) private familyNavigation: Navigation[],
    @Inject(STUDENT_NAVIGATION) private studentNavigation: Navigation[],
    @Inject(ADMIN_FAMILY_NAVIGATION) private adminFamilyNavigation: Navigation[]
  ) {
    this.navigationsAdmin = adminNavigation;
    this.navigationsTeacher = teacherNavigation;
    this.navigationsFamily = familyNavigation;
    this.navigationsStudent = studentNavigation;
    this.navigationsAdminFamily = adminFamilyNavigation;
    this._initAdmin();
    this._initTeacher();
    this._initFamily();
    this._initStudent();
    this._initAdminFamily();
  }

  get getConfigAdmin(): Observable<any> {
    return this.navigationAdminSubject.asObservable();
  }

  private _initAdmin(): void {
    this.navigationAdminSubject = new BehaviorSubject<any[]>(this.navigationsAdmin);
  }

  get getConfigTeacher(): Observable<any> {
    return this.navigationTeacherSubject.asObservable();
  }

  private _initTeacher(): void {
    this.navigationTeacherSubject = new BehaviorSubject<any[]>(this.navigationsTeacher);
  }

  get getConfigFamily(): Observable<any> {
    return this.navigationFamilySubject.asObservable();
  }

  private _initFamily(): void {
    this.navigationFamilySubject = new BehaviorSubject<any[]>(this.navigationsFamily);
  }

  get getConfigStudent(): Observable<any> {
    return this.navigationStudentSubject.asObservable();
  }

  private _initStudent(): void {
    this.navigationStudentSubject = new BehaviorSubject<any[]>(this.navigationsStudent);
  }

  get getConfigAdminFamily(): Observable<any> {
    return this.navigationAdminFamilySubject.asObservable();
  }

  private _initAdminFamily(): void {
    this.navigationAdminFamilySubject = new BehaviorSubject<any[]>(this.navigationsAdminFamily);
  }

  navigations() {
    this.change.emit();
  }

}
