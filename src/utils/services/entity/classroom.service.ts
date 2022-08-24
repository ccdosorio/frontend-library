import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Classroom } from '@models';

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

  // Crear una clase
  create(bodeObject: any) {
    return this.http.post(environment.endpoint + 'classrooms', bodeObject, {})
  }

  // Editar una clase
  update(bodeObject: any, classromId: number) {
    return this.http.put(environment.endpoint + 'classrooms/' + classromId, bodeObject)
  }
}
