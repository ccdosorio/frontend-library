import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';

import { AppConfigService, ClassroomService } from '@services';
import { Classroom, ClassroomBook } from '@models';

@Component({
  selector: 'app-detail-assignment',
  templateUrl: './detail-assignment.component.html',
  styleUrls: ['./detail-assignment.component.scss']
})
export class DetailAssignmentComponent implements OnInit {

  classroomId: number = 0;
  classroom: Classroom | undefined;
  showEmptyMessage: boolean = false;
  books: ClassroomBook[] = [];

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
    this.route.params.subscribe((params) => {
      if (Object.keys(params).length > 0) {
        this.classroomId = Number(params['id']);
        this.getClassroom();
      }
    });
  }

  getClassroom(): void {
    this.spinner.show();
    this.classroomService.getClassroomInfo(this.classroomId)
      .subscribe({
        next: (resp) => {
          this.classroom = resp;
          this.getBooks(this.classroomId);
        },
        error: () => this.spinner.hide()
      });
  }

  getBooks(classroomId: number): void {
    this.showEmptyMessage = false;
    this.classroomService.getClassroomBooks(classroomId)
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

}
