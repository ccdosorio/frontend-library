import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Classroom, Book, ClassroomBook } from '@models';

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

  // upload excel invitations
  uploadFile(classroomId: number, file: File) {
    let body = new FormData();
    body.append('students', file);
    return this.http.post(environment.endpoint + 'classrooms/' + classroomId + '/add-students', body);
  }
}
