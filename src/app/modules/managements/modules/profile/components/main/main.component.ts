import { Component, OnInit } from '@angular/core';

import { AppConfigService, UserService } from '@services';
import { UserInfo } from '@models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SweetAlertMessage } from '@functions';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  user: UserInfo | undefined;

  formUser: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    photo_url: ['']
  });

  isEdit: boolean = false;

  constructor(
    private appConfigService: AppConfigService,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.appConfigService.setConfig({
      layout: {
        generic_container: { visible: false },
        sidenav: { visible: true },
        toolbar: { visible: false }
      }
    });
  }

  getUser(): void {
    this.userService.getUser()
      .subscribe({
        next: resp => {
          this.user = resp;
          this.setForm();
        },
        error: error => console.log(error)
      });
  }

  setForm(): void {
    this.formUser.get('name')?.setValue(this.user?.name);
    this.formUser.get('email')?.setValue(this.user?.email_address);
    this.formUser.get('photo_url')?.setValue(this.user?.photo);
  }

  activeForm(): void {
    this.isEdit = !this.isEdit;
  }

  get editForm(): boolean {
    return this.formUser.invalid && this.isEdit ? false : true;
  }

  onSubmit(): void {
    this.userService.update(this.formUser.value, this.user!.id).subscribe({
      next: (resp) => {
        this.user = resp;
        SweetAlertMessage('success', 'Exitoso', 'Usuario Editado con éxito.');
      },
      error: (err) => {
        console.log(err);
        SweetAlertMessage('error', 'Error', 'Ocrruió un error al editar el usuario.');
      }
    })

  }

  ngOnInit(): void {
    this.getUser();
  }

}
