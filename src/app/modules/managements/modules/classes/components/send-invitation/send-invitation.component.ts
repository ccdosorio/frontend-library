import { Component, Inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { NgxSpinnerService } from 'ngx-spinner';

import { SweetAlertMessage } from '@functions';
import { ClassroomService } from '@services';
import { Classroom } from '@models';

const FileSaver = require('file-saver');

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

  ngOnInit(): void { }

  onFileChange(event: any) {
    this.file = event.target.files[0];    
  }

  upload(): void {
    if (this.file === undefined) {
      SweetAlertMessage('info', 'Información', 'Selecciona un archivo para poder continuar.');
      return;
    }

    this.spinner.show();

    this.classroomService.uploadFile(this.data.data.id, this.file!).subscribe({
      next: (resp) => {
        SweetAlertMessage('success', 'Exitoso', 'Archivo subido con éxito.');
        const blob = new Blob([resp], { type : 'application/vnd.ms.excel' });
        const fileXls = new File([blob], this.file!.name, { type: 'application/vnd.ms.excel' });
        FileSaver.saveAs(fileXls);
        this.data.action.dialog.closeAll();
        this.spinner.hide();
        this.file = undefined;
      }, error: () => {
        SweetAlertMessage('error', 'Error', 'Ocurrió un error al subir el archivo.');
        this.spinner.hide();
      }
    });

  }

}
