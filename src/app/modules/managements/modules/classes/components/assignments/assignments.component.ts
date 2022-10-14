import { Component, OnInit } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';

import { AppConfigService, ClassroomService } from '@services';
import { StudentClassroom } from '@models';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent implements OnInit {

  listClassrooms: StudentClassroom[] = [];
  isData: boolean = false;

  constructor(
    private appConfigService: AppConfigService,
    private spinner: NgxSpinnerService,
    private classroomService: ClassroomService,
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
    this.getAssignments();
  }

  getAssignments(): void {
    this.spinner.show();
    this.classroomService.getStudentClassroom()
      .subscribe({
        next: resp => {
          this.listClassrooms = resp;
          this.isData = true;
          this.spinner.hide();
        }, error: _ => {
          this.isData = true;
          this.spinner.hide();
        }
      })
  }
}
