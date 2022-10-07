import { Component, Input, OnInit } from '@angular/core';
import { ClassromStudent } from '@models';

@Component({
  selector: 'app-list-classroom-students',
  templateUrl: './list-classroom-students.component.html',
  styleUrls: ['./list-classroom-students.component.scss']
})
export class ListClassroomStudentsComponent implements OnInit {

  @Input() students: ClassromStudent[] = [];

  constructor() { }

  ngOnInit(): void { }

}
