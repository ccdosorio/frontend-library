import { Component, OnInit } from '@angular/core';

import * as feather from 'feather-icons';

import { AppConfigService, UserService } from '@services';
import { UserInfo } from '@models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SweetAlertMessage } from '@functions';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  // flags
  isBasicPlan: boolean = false;
  isTeacherPlan: boolean = false;
  isFamilyPlan: boolean = false;

  // image
  file: File | undefined;

  tabs: any[] = [
    {
      tabIndex: 0,
      title: 'General',
      active: true
    },
    {
      tabIndex: 1,
      title: 'Suscripción',
      active: false
    },
    {
      tabIndex: 2,
      title: 'Cambiar plan',
      active: false
    },
    // {
    //   tabIndex: 3,
    //   title: 'Configuraciones',
    //   active: false
    // }
  ];

  // flags
  isTabGeneral: boolean = true;
  isTabSuscription: boolean = false;
  isTabPlan: boolean = false;
  isTabConfig: boolean = false;

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
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
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
    this.spinner.show();
    this.userService.getUser()
      .subscribe({
        next: resp => {
          this.user = resp;
          this.setRole();
          this.setForm();
          this.spinner.hide();
        },
        error: _ => {
          this.spinner.hide()
        }
      });
  }

  setForm(): void {
    this.formUser.get('name')?.setValue(this.user?.name);
    this.formUser.get('email')?.setValue(this.user?.email_address);
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
        this.setForm();
        SweetAlertMessage('success', 'Exitoso', 'Usuario Editado con éxito.');
      },
      error: (err) => {
        console.log(err);
        SweetAlertMessage('error', 'Error', 'Ocrruió un error al editar el usuario.');
      }
    })

  }

  changeTab(index: number) {
    if (index === 0) {
      this.isTabGeneral = true;
      this.isTabSuscription = this.isTabConfig = this.isTabPlan = false;
    } else if (index === 1) {
      this.isTabSuscription = true;
      this.isTabGeneral = this.isTabConfig = this.isTabPlan = false;
    } else if (index === 2) {
      this.isTabPlan = true;
      this.isTabGeneral = this.isTabConfig = this.isTabSuscription = false;
    } else if (index === 3) {
      this.isTabConfig = true;
      this.isTabGeneral = this.isTabPlan = this.isTabSuscription = false;
    }

    this.tabs = this.tabs.map((tab, i) => i === index ? { ...tab, active: true } : { ...tab, active: false });
  }

  changePlan(type: number): void {
    this.spinner.show();
    let endpoint: string = '';
    if (type === 1) {
      endpoint = 'basic-role';
    } else if (type === 2) {
      endpoint = 'professor-role';
    } else if (type === 3) {
      endpoint = 'family-role';
    }

    this.userService.setRol(endpoint).subscribe({
      next: () => {
        this.getUser();
        SweetAlertMessage('success', 'Exitoso', 'Suscripción realizada exitosamente.');
        this.spinner.hide();
      },
      error: () => {
        SweetAlertMessage('error', 'Error', 'Ocurrió un error durante la modificación del plan.');
        this.spinner.hide();
      }
    })
  }

  setRole(): void {
    // setting
    this.isBasicPlan = this.isFamilyPlan = this.isTeacherPlan = false;
    if (this.user?.authorities.length === 1) {
      this.isBasicPlan = true;
    }

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

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  ngOnInit(): void {
    feather.replace();
    this.getUser();
  }

}
