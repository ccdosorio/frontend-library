import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import * as feather from 'feather-icons';
import { NgxSpinnerService } from 'ngx-spinner';

import { AppConfigService, ClassroomService } from '@services';
import { Classroom, ClassroomBook } from '@models';
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
  books: ClassroomBook[] = [];

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
      } else {
        this.classroomId = 0;
      }
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
          console.log(resp);

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

}
