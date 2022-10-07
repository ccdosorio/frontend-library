import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Classroom, ClassromStudent, ClassroomBook } from '@models';

import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  constructor(
    private http: HttpClient
  ) { }

  // Obtener las clases del usuario
  getClassrooms(): Observable<Classroom[]> {
    return this.http.get<Classroom[]>(environment.endpoint + 'classrooms', {});
  }

  // Obtener una clase en base a su id
  getById(classroomId: number): Observable<Classroom> {
    return this.http.get<Classroom>(environment.endpoint + 'classrooms/' + classroomId, {});
  }

  // Obtener libros de la clase
  getBooksByClassroom(classroomId: number): Observable<ClassroomBook[]> {
    return this.http.get<ClassroomBook[]>(environment.endpoint + 'classrooms/' + classroomId + '/books', {});
  }

  // Obtener estudiantes de la clase
  getClassroomStudents(classroomId: number): Observable<ClassromStudent[]> {
    return this.http.get<ClassromStudent[]>(environment.endpoint + 'classrooms/' + classroomId + '/students', {});
  }

  // Crear una clase
  create(bodeObject: any) {
    return this.http.post(environment.endpoint + 'classrooms', bodeObject, {});
  }

  // Agregar libro a una clase
  addBookClassroom(classroomId: number, bodeObject: any) {
    return this.http.post(environment.endpoint + 'classrooms/' + classroomId + '/books', bodeObject, {});
  }

  // Editar una clase
  update(bodeObject: any, classromId: number) {
    return this.http.post(environment.endpoint + 'classrooms/' + classromId, bodeObject, {});
  }

  // Descargar excel de invitaciones
  uploadFile(classroomId: number, file: File) {
    let body = new FormData();
    body.append('students', file);

    return this.http.post(environment.endpoint + 'classrooms/' + classroomId + '/add-students', body, { responseType: 'blob' });
  }

  // Descargar template
  downloadTemplate() {
    return this.http.get(environment.endpoint + 'classrooms/students-file-template', { responseType: 'blob' });
  }

  // Invitar invitación a un familiar
  sendInvitation(body: any, classromId: number) {
    return this.http.post(environment.endpoint + 'classrooms/' + classromId + '/add-student', body, {});
  }
}
