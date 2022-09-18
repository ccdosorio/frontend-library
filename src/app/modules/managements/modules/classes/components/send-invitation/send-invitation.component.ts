import { Component, Inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { NgxSpinnerService } from 'ngx-spinner';

import { SweetAlertMessage } from '@functions';
import { ClassroomService } from '@services';
import { Classroom } from '@models';

@Component({
  selector: 'app-send-invitation',
  templateUrl: './send-invitation.component.html',
  styleUrls: ['./send-invitation.component.scss']
})
export class SendInvitationComponent implements OnInit {

  file: File | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { data: Classroom, action: any },
    private spinner: NgxSpinnerService,
    private classroomService: ClassroomService
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

    this.spinner.show();

    this.classroomService.uploadFile(1, this.file!).subscribe({
      next: () => {
        SweetAlertMessage('success', 'Exitoso', 'Archivo subido con éxito.');
        this.file = undefined;
        this.data.action.dialog.closeAll();
        this.data.action.loadPdf();
        this.spinner.hide();

      }, error: (error) => {
        this.data.action.loadPdf();
        SweetAlertMessage('error', 'Error', error.error.message);
        this.spinner.hide();
      }
    });

  }

}
