import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as feather from 'feather-icons';

import { AppConfigService, ClassroomService } from '@services';
import { SweetAlertMessage } from '@functions';
import { ActivatedRoute, Router } from '@angular/router';
import { Classroom } from '@models';

@Component({
  selector: 'app-create-classroom',
  templateUrl: './create-classroom.component.html',
  styleUrls: ['./create-classroom.component.scss']
})
export class CreateClassroomComponent implements OnInit {

  loading = false;
  titleAction: string = '';
  rol: string = '';
  title: string = 'clase';
  classroomId: number | undefined;

  formClassroom: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private appConfigService: AppConfigService,
    private classroomService: ClassroomService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.appConfigService.setConfig({
      layout: {
        generic_container: { visible: false },
        sidenav: { visible: true },
        toolbar: { visible: false }
      }
    });
  }

  onSubmit(): void {
    this.loading = true;
    if (this.formClassroom.invalid) {
      this.loading = false;
      SweetAlertMessage('info', 'Información', 'Debe completar todos los campos.');
      return;
    }

    if (this.classroomId === 0) {
      this.createClassroom();
    } else {
      this.updateClassroom();
    }
  }

  createClassroom(): void {
    this.classroomService.create(this.formClassroom.value)
    .subscribe({
      next: () => {
        this.loading = false;
        SweetAlertMessage('success', 'Exitoso', 'Clase creada exitosamente.');
        this.router.navigate(['Managements/Classrooms/Main']);
      },
      error: () => {
        this.loading = false;
        SweetAlertMessage('error', 'Error', 'Ocurrió un error al crear el registro.');
      }
    });
  }

  updateClassroom(): void {
    this.classroomService.update(this.formClassroom.value, this.classroomId!)
    .subscribe({
      next: () => {
        this.loading = false;
        SweetAlertMessage('success', 'Exitoso', 'Clase editada exitosamente.');
        this.router.navigate(['Managements/Classrooms/Main']);
      },
      error: () => {        
        this.loading = false;
        SweetAlertMessage('error', 'Error', 'Ocurrió un error al editar el registro.');
      }
    });
  }

  getClassroom(classroomId: number): void {
    this.classroomService.getById(classroomId)
    .subscribe({
      next: (resp) => this.setUserForm(resp),
      error: (error) => console.log(error)
    });
  }

  setUserForm(classroom: Classroom): void {
    this.formClassroom.get('name')?.setValue(classroom.name);
    this.formClassroom.get('description')?.setValue(classroom.description);
  }

  ngOnInit(): void {
    feather.replace();
    this.route.params.subscribe((params) => {      
      if (Object.keys(params).length > 0) {
        this.classroomId = Number(params['id']);
        this.titleAction = 'Editar';        
        this.getClassroom(Number(params['id']));
      } else {
        this.titleAction = 'Crear';
        this.classroomId = 0;
      }
    });
    this.rol = localStorage.getItem('rol')! || 'Sin información';
    if (this.rol == 'FAMILY_USER_ROLE') {
      this.title = 'sala';
    }
  }

}
