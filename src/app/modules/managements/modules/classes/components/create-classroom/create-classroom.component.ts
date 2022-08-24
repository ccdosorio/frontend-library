import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppConfigService, ClassroomService } from '@services';
import { SweetAlertMessage } from '@functions';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-classroom',
  templateUrl: './create-classroom.component.html',
  styleUrls: ['./create-classroom.component.scss']
})
export class CreateClassroomComponent implements OnInit {

  loading = false;
  titleAction: string = '';
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

  getClassroom(classroomId: number): void {
    this.classroomService.getById(classroomId)
    .subscribe({
      next: (resp) => {
        console.log('resp: ', resp);
        
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {      
      if (Object.keys(params).length > 0) {
        this.classroomId = Number(params['id']);
        this.titleAction = 'Editar';
        console.log(params['id']);
        
        this.getClassroom(Number(params['id']));
      } else {
        this.titleAction = 'Crear';
        this.classroomId = 0;
      }
    }); 
  }

}
