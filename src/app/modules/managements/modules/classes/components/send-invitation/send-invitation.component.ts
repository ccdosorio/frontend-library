import { Component, Inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { NgxSpinnerService } from 'ngx-spinner';

import { SweetAlertMessage } from '@functions';
import { ClassroomService, UserService } from '@services';
import { Classroom, UserInfo } from '@models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const FileSaver = require('file-saver');

@Component({
  selector: 'app-send-invitation',
  templateUrl: './send-invitation.component.html',
  styleUrls: ['./send-invitation.component.scss']
})
export class SendInvitationComponent implements OnInit {

  file: File | undefined;
  user: UserInfo | undefined;

  isFamilyPlan: boolean = false;
  isTeacherPlan: boolean = false;

  formInvite: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { data: Classroom, action: any },
    private spinner: NgxSpinnerService,
    private classroomService: ClassroomService,
    private userService: UserService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getUser();
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

    this.classroomService.uploadFile(this.data.data.id, this.file!).subscribe({
      next: (resp) => {
        SweetAlertMessage('success', 'Exitoso', 'Archivo subido con éxito.');
        const blob = new Blob([resp], { type: 'application/vnd.ms.excel' });
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

  getUser(): void {
    this.userService.getUser()
      .subscribe({
        next: resp => {
          this.user = resp;
          if (this.user!.authorities.length > 1) {
            this.user!.authorities.filter(item => {
              if (item.name === 'PROFESSOR_USER_ROLE') {
                this.isTeacherPlan = true;

              }
              if (item.name === 'FAMILY_USER_ROLE') {
                this.isFamilyPlan = true;
              }
            });
          }
        }
      });
  }

  sendInvite(): void {

  }

}
