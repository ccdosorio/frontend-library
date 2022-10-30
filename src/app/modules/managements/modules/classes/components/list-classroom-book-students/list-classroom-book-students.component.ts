import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import * as feather from 'feather-icons';

import { AppConfigService, ClassroomService } from '@services';
import { ClassroomBookStudent } from '@models';

@Component({
  selector: 'app-list-classroom-book-students',
  templateUrl: './list-classroom-book-students.component.html',
  styleUrls: ['./list-classroom-book-students.component.scss']
})
export class ListClassroomBookStudentsComponent implements OnInit {

  classroomId: number = 0;
  bookId: number = 0;
  showEmptyMessage: boolean = false;
  listStudents: ClassroomBookStudent[] = [];

  constructor(
    private appConfigService: AppConfigService,
    private classroomService: ClassroomService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
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
        this.classroomId = Number(params['classroomId']);
        this.bookId = Number(params['bookId']);
        this.getStudents();
      }
    });
  }

  getStudents(): void {
    this.showEmptyMessage = false;
    this.spinner.show();
    this.classroomService.getClassroomBookStudents(this.classroomId, this.bookId)
      .subscribe({
        next: (resp) => {
          if (resp.length === 0) {
            this.showEmptyMessage = true;
          }
          this.listStudents = resp;
          this.spinner.hide();
        },
        error: _ => {
          this.showEmptyMessage = true;
          this.spinner.hide();
        }
      });
  }
}
