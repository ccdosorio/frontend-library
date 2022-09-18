import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';

import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Book, Classroom } from '@models';
import { BookService, ClassroomService } from '@services';
import { SweetAlertMessage } from '@functions';

@Component({
  selector: 'app-create-classroom-book',
  templateUrl: './create-classroom-book.component.html',
  styleUrls: ['./create-classroom-book.component.scss']
})
export class CreateClassroomBookComponent implements OnInit {

  formClassroom: FormGroup = this.fb.group({
    description: ['', Validators.required]
  });

  loading = false;
  showEmptyMessage: boolean = false;

  listBooks: Book[] = [];

  displayedColumns: string[] = ['select', 'id', 'title', 'isbn10', 'isbn13'];
  dataSource = new MatTableDataSource<Book>([]);
  selection = new SelectionModel<Book>(false, []);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { data: Classroom, action: any },
    private fb: FormBuilder,
    private bookService: BookService,
    private classroomService: ClassroomService
  ) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getBooks()
      .subscribe({
        next: (resp) => {
          if (resp.length === 0) {
            this.showEmptyMessage = true;
          }
          this.dataSource = new MatTableDataSource<Book>(resp);
          this.listBooks = resp;
        },
        error: () => this.showEmptyMessage = false
      });
  }

  create(): void {
    this.loading = true;
    if (this.formClassroom.invalid) {
      this.loading = false;
      SweetAlertMessage('info', 'Información', 'Debe completar todos los campos.');
      return;
    }

    if (this.selection.selected.length === 0) {
      this.loading = false;
      SweetAlertMessage('info', 'Información', 'Debe seleccionar un libro.');
      return;
    }

    const PAYLOAD = {
      book_id: this.selection.selected[0].book.id,
      description: this.formClassroom.get('description')?.value
    };

    this.classroomService.addBookClassroom(this.data.data.id,  PAYLOAD)
      .subscribe({
        next: () => {
          this.loading = false;
          SweetAlertMessage('success', 'Exitoso', 'Libro agregado correctamente.');
          this.data.action.dialogReference.close();
          this.data.action.getBooks(this.data.data.id);
        },
        error: () => {
          this.loading = false;
          SweetAlertMessage('error', 'Error', 'Ocurrió un error al crear el registro.');
          this.data.action.dialogReference.close();
        }
      });

  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: Book): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

}
