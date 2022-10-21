import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Classroom, ClassromStudent, ClassroomBook, CreateStudentBookAnswer, Answer, StudentClassroom, BookProgress, BookPage } from '@models';
import { environment } from 'environments/environment';

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

  // Obtener libros de la clase
  getBookByClassroom(classroomId: number, bookId: number): Observable<ClassroomBook> {
    return this.http.get<ClassroomBook>(environment.endpoint + 'classrooms/' + classroomId + '/books/' + bookId, {});
  }

  // Obtener estudiantes de la clase
  getClassroomStudents(classroomId: number): Observable<ClassromStudent[]> {
    return this.http.get<ClassromStudent[]>(environment.endpoint + 'classrooms/' + classroomId + '/students', {});
  }

  // Obtener el cuántas clases hay registradas
  getCountClassroom() {
    return this.http.get(environment.endpoint + 'counting/classrooms');
  }

  // Obtener las clases del estudiante (asignaciones)
  getStudentClassroom(): Observable<StudentClassroom[]> {
    return this.http.get<StudentClassroom[]>(environment.endpoint + 'students/classrooms');
  }

  // Obtener la página del libro
  getStudentBookPage(classroomId: number, userId: number, bookId: number): Observable<BookPage> {
    return this.http.get<BookPage>(environment.endpoint + 'classrooms/' + classroomId + '/students/' + userId + '/books/' + bookId + '/page');
  }

  // Obtener progreso de la lectura
  getStudentBookProgressRate(classroomId: number, userId: number, bookId: number): Observable<BookProgress> {
    return this.http.get<BookProgress>(environment.endpoint + 'classrooms/' + classroomId + '/students/' + userId + '/books/' + bookId + '/book-progress-rate');
  }

  // Actualizar la página del alumno
  updateStudentBookPage(classroomId: number, userId: number, bookId: number, body: any): Observable<BookPage> {
    return this.http.post<BookPage>(environment.endpoint + 'classrooms/' + classroomId + '/students/' + userId + '/books/' + bookId + '/page', body, {});
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

  // view file pdf
  viewPdfFileClassroom(bookId: number, classroomId: number) {
    let headers = new HttpHeaders()
      .set('Accept', 'application/pdf');
    return this.http.get(environment.endpoint + 'classrooms/' + classroomId + '/students/books/' + bookId, { headers, responseType: 'blob' });
  }

  // Descargar template
  downloadTemplate() {
    return this.http.get(environment.endpoint + 'classrooms/students-file-template', { responseType: 'blob' });
  }

  // Invitar invitación a un familiar
  sendInvitation(body: any, classromId: number) {
    return this.http.post(environment.endpoint + 'classrooms/' + classromId + '/add-student', body, {});
  }

  // Crear la respuesta del libro
  createStudentBookAnswer(classroomId: number, userId: number, bookId: number, body: CreateStudentBookAnswer[]): Observable<Answer[]> {
    return this.http.post<Answer[]>(environment.endpoint + 'classrooms/' + classroomId + '/students/' + userId + '/books/' + bookId + '/answers', { answers: body }, {});
  }
}
