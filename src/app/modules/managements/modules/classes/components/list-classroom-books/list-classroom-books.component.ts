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

  constructor() { }

  ngOnInit(): void {
  }

}
