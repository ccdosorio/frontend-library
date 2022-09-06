import { Component, Inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SweetAlertMessage } from '@functions';
import { BookService } from '@services';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  file: File | undefined;

  constructor(
    private bookService: BookService,
    @Inject(MAT_DIALOG_DATA) public data: { bookId: number, action: any },
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  upload(): void {
    if (this.file === undefined) {
      SweetAlertMessage('info', 'Información', 'Selecciona un archivo para poder continuar.');
      return;
    }

    if (this.file.size >= 104857600) {
      SweetAlertMessage('info', 'Información', 'El archivo es demasiado grande, por favor seleccione un archivo de menos de 100MB.');
      return;
    }

    this.spinner.show();

    this.bookService.uploadFile(this.data.bookId, this.file!).subscribe({
      next: () => {
        SweetAlertMessage('success', 'Exitoso', 'Archivo subido con éxito.');
        this.file = undefined;
        this.data.action.dialog.closeAll();
        this.spinner.hide();

      }, error: (error) => {
        SweetAlertMessage('error', 'Error', error.message);
        this.spinner.hide();
      }
    })
  }

}
