import { Component, Input, OnInit } from '@angular/core';
import { ClassroomBook } from '@models';

@Component({
  selector: 'app-list-classroom-books',
  templateUrl: './list-classroom-books.component.html',
  styleUrls: ['./list-classroom-books.component.scss']
})
export class ListClassroomBooksComponent implements OnInit {

  @Input() books: ClassroomBook[] = [];
  @Input() classroomId: number | undefined;
  @Input() isAssignment: boolean = false;
  isTeacher: boolean = true;

  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem('rol')
      && (localStorage.getItem('rol') !== 'PROFESSOR_USER_ROLE'
        && localStorage.getItem('rol') !== 'FAMILY_USER_ROLE')) {
      this.isTeacher = false;
    }
  }

}
