import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgxSpinnerService } from 'ngx-spinner';

import { AppConfigService, BookService } from '@services';
import { SweetAlertMessage } from '@functions';
import { BookISBN } from '@models';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {

  formSearch: FormGroup = this.fb.group({
    isbnControl: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(13)]]
  });

  book: BookISBN | undefined;
  showEmptyMessage: boolean = false;

  constructor(
    private appConfigService: AppConfigService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private bookService: BookService
  ) {
    this.appConfigService.setConfig({
      layout: {
        generic_container: { visible: false },
        sidenav: { visible: true },
        toolbar: { visible: false }
      }
    });
  }

  searchBook(): void {
    if (!this.formSearch.valid) {
      SweetAlertMessage('info', 'Información', 'Debes ingresar un ISBN válido para continuar.');
      return;
    }

    this.spinner.show();
    const { isbnControl } = this.formSearch.value;

    this.bookService.getByISBN(isbnControl).subscribe({
      next: (resp) => {
        this.showEmptyMessage = false;
        this.book = resp;
        this.spinner.hide();
      },
      error: (error) => {
        SweetAlertMessage('error', 'Error', error.error.message);
        this.spinner.hide();
        this.showEmptyMessage = true;
      }
    });
  }
  
  createUserBook(): void {
    this.spinner.show();
    const PAYLOAD = { 
      book_id: this.book!.id
    };

    this.bookService.createUserBook(PAYLOAD).subscribe({
      next: () => {
        SweetAlertMessage('success', 'Exitoso', 'Libro creado con éxito.');
        this.book = undefined;
        this.formSearch.get('isbnControl')?.reset();
        this.spinner.hide();
      },
      error: (error) => {
        if (error.status === 422) {
          SweetAlertMessage('error', 'Error', 'El libro ya existe en el sistema.');
        } else {
          SweetAlertMessage('error', 'Error', 'Ocurrió un error al crear el libro.');
        }
        this.book = undefined;
        this.formSearch.get('isbnControl')?.reset();
        this.spinner.hide();
      }
    });

  }

  ngOnInit(): void {
  }

}
