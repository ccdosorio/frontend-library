import { Component, OnInit } from '@angular/core';

import { NgxSpinnerService } from "ngx-spinner";

import { AppConfigService } from '@services';
import { ClassroomService } from 'utils/services/entity/classroom.service';
import { Classroom } from '@models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  listClassrooms: Classroom[] = [];
  isData: boolean = false;

  constructor(
    private appConfigService: AppConfigService,
    private spinner: NgxSpinnerService,
    private classroomService: ClassroomService,
    private router: Router
  ) {
    this.appConfigService.setConfig({
      layout: {
        generic_container: { visible: false },
        sidenav: { visible: true },
        toolbar: { visible: false }
      }
    });
  }

  getData(): void {
    this.spinner.show();
    this.classroomService.getClassrooms()
      .subscribe({
        next: (resp => {
          this.listClassrooms = resp;
          this.isData = true;
          this.spinner.hide();
        }),
        error: () => {
          this.isData = true;
          this.spinner.hide();
        }
      })
  }

  ngOnInit(): void {
    this.getData();
  }

  addClass(): void {
    this.router.navigate(['../Create']);
  }

}
