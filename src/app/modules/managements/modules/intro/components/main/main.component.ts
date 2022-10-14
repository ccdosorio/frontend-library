import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Navigation, UserInfo } from '@models';

import { NgxSpinnerService } from 'ngx-spinner';

import { AppConfigService, AuthenticationService, BookService, ClassroomService, UserService } from '@services';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  navigation: Navigation[] = [];
  user: UserInfo | undefined;
  countClassrooms: number = 0;
  countBooks: number = 0;
  countUsers: number = 0;
  countStudents: number = 0;
  countProfessors: number = 0;
  countFamily: number = 0;

  constructor(
    private appConfigService: AppConfigService,
    public authenticationService: AuthenticationService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private userService: UserService,
    private classroomService: ClassroomService,
    private bookService: BookService
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
      },
      error: (error) => {
        console.log(error);
        this.spinner.hide();
      }
    });
    this.countClassroom();
    this.countBook();
    this.countUser();
    this.countStudent();
    this.countTeachers();
    this.countFamilyMembers();
  }

  countClassroom(): void {
    this.classroomService.getCountClassroom().subscribe({
      next: (resp: any) => {
        this.countClassrooms = resp['count'];
      }
    });
  }

  countBook(): void {
    this.bookService.getCountBooks().subscribe({
      next: (resp: any) => {
        this.countBooks = resp['count'];
      }
    });
  }

  countUser(): void {
    this.userService.getCountUsers().subscribe({
      next: (resp: any) => {
        this.countUsers = resp['count'];
      }
    });
  }

  countStudent(): void {
    this.userService.getCountStudents().subscribe({
      next: (resp: any) => {
        this.countStudents = resp['count'];
      }
    });
  }

  countTeachers(): void {
    this.userService.getCountTeachers().subscribe({
      next: (resp: any) => {
        this.countProfessors = resp['count'];
      }
    });
  }

  countFamilyMembers(): void {
    this.userService.getCountFamily().subscribe({
      next: (resp: any) => {
        this.countFamily = resp['count'];
      }
    });
  }
}
