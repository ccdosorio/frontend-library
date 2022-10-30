import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import * as feather from 'feather-icons';

import { AppConfigService, ClassroomService } from '@services';
import { Answer } from '@models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-students-answers',
  templateUrl: './students-answers.component.html',
  styleUrls: ['./students-answers.component.scss']
})
export class StudentsAnswersComponent implements OnInit {

  classroomId: number = 0;
  bookId: number = 0;
  studentId: number = 0;
  answerRate: number = 0;
  showEmptyMessage: boolean = false;
  listAnswers: Answer[] = [];

  displayedColumns: string[] = ['id', 'question_statement', 'answer', 'status'];
  dataSource = new MatTableDataSource<Answer>([]);

  @ViewChild(MatPaginator) paginator: any = MatPaginator;

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
        this.studentId = Number(params['userId']);
        this.getAnswersRate();
        this.getAnswers();
      }
    });
  }

  getAnswersRate(): void {
    this.classroomService.getStudentBookAnswersRate(this.classroomId, this.studentId, this.bookId)
      .subscribe({
        next: (resp) => this.answerRate = resp['answer_rate']
      });
  }

  getAnswers(): void {
    this.showEmptyMessage = false;
    this.spinner.show();
    this.classroomService.getStudentBookAnswers(this.classroomId, this.studentId, this.bookId)
      .subscribe({
        next: (resp) => {
          if (resp.length === 0) {
            this.showEmptyMessage = true;
          }
          this.listAnswers = resp;
          this.dataSource = new MatTableDataSource(resp);
          this.dataSource.paginator = this.paginator;
          this.spinner.hide();
        },
        error: _ => {
          this.showEmptyMessage = true;
          this.spinner.hide();
        }
      });
  }

}
