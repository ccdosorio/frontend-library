import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import * as feather from 'feather-icons';
import { NgxSpinnerService } from 'ngx-spinner';

import { AppConfigService, ClassroomService } from '@services';
import { Classroom, ClassroomBook, ClassromStudent } from '@models';
import { SendInvitationComponent } from '../send-invitation/send-invitation.component';
import { CreateClassroomBookComponent } from '../create-classroom-book/create-classroom-book.component';

@Component({
  selector: 'app-detail-classroom',
  templateUrl: './detail-classroom.component.html',
  styleUrls: ['./detail-classroom.component.scss']
})
export class DetailClassroomComponent implements OnInit {

  classroomId: number | undefined;
  classroom: Classroom | undefined;
  showEmptyMessage: boolean = false;
  showEmptyMessageStudents: boolean = false;
  books: ClassroomBook[] = [];
  students: ClassromStudent[] = [];
  titleValue: string = 'Estudiantes';
  rol: string = '';

  tabs: any[] = [
    {
      tabIndex: 0,
      title: 'Libros',
      active: true,
    }
  ];

  // flags
  isTabBooks: boolean = true;
  isTabStudents: boolean = false;

  constructor(
    private appConfigService: AppConfigService,
    private classroomService: ClassroomService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private dialogReference: MatDialogRef<any>
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
    feather.replace();
    this.route.params.subscribe((params) => {
      if (Object.keys(params).length > 0) {
        this.classroomId = Number(params['id']);
        this.getClassroom(Number(params['id']));
        this.getClassroomStudents(Number(params['id']));
      } else {
        this.classroomId = 0;
      }
    });
    this.rol = localStorage.getItem('rol')! || 'Sin información';

    if (this.rol == 'FAMILY_USER_ROLE') {
      this.titleValue = 'Familiares';
    }
    this.tabs.push({
      tabIndex: 1,
      title: this.titleValue,
      active: false
    });
  }

  getClassroom(classroomId: number): void {
    this.spinner.show();
    this.classroomService.getById(classroomId)
      .subscribe({
        next: (resp) => {
          this.classroom = resp;
          this.getBooks(classroomId);
        },
        error: () => this.spinner.hide()
      });
  }

  getBooks(classroomId: number): void {
    this.classroomService.getBooksByClassroom(classroomId)
      .subscribe({
        next: (resp) => {
          if (resp.length === 0) {
            this.showEmptyMessage = true;
          }
          this.books = resp;
          this.spinner.hide();
        },
        error: () => {
          this.showEmptyMessage = false;
          this.spinner.hide();
        }
      });
  }

  getClassroomStudents(classroomId: number): void {
    this.classroomService.getClassroomStudents(classroomId)
      .subscribe({
        next: (resp) => {
          if (resp.length === 0) {
            this.showEmptyMessageStudents = true;
          }
          this.students = resp;
        },
        error: _ => this.showEmptyMessageStudents = false
      });
  }

  openDialogInvite(): void {
    this.dialogReference = this.dialog.open(SendInvitationComponent, {
      width: '500px',
      maxHeight: '80vh',
      data: { data: this.classroom, action: this }
    });
  }

  openDialogClassroomBook(): void {
    this.dialogReference = this.dialog.open(CreateClassroomBookComponent, {
      width: '120vh',
      maxHeight: '80vh',
      data: { data: this.classroom, action: this }
    });
  }

  changeTab(index: number) {
    if (index === 0) {
      this.isTabBooks = true;
      this.isTabStudents = false
    } else if (index === 1) {
      this.isTabStudents = true
      this.isTabBooks = false;
    }

    this.tabs = this.tabs.map((tab, i) => i === index ? { ...tab, active: true } : { ...tab, active: false });
  }

}
