import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInfo, UserInvitation, UserProfile } from '@models';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  // Obtener los datos del usuario authenticado
  getUser(): Observable<UserInfo> {
    return this.http.get<UserInfo>(environment.endpoint + 'users', {});
  }

  // Obtener al usuario invitado
  getUserInvitations(uuid: number): Observable<UserInvitation> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic bGlicmFyeS1nYWxpbGVvLXByb2plY3Q6NjhlZTM3NjMtNDMxNS00OTI4LWI0MzUtYzNlZGMwOTNkM2E5');
    return this.http.get<UserInvitation>(environment.endpoint + 'users/invitations/' + uuid, { headers });
  }

  // Obtener el rol del usuario
  getUserProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(environment.endpoint + 'users/profile');
  }

  // Obtener el cuántos usuarios hay registrados
  getCountUsers() {
    return this.http.get(environment.endpoint + 'counting/users');
  }

  // Obtener el cuántos estudiantes hay registrados
  getCountStudents() {
    return this.http.get(environment.endpoint + 'counting/students');
  }

  // Obtener el cuántos estudiantes hay registrados
  getCountTeachers() {
    return this.http.get(environment.endpoint + 'counting/professors');
  }

  // Obtener el cuántos estudiantes hay registrados
  getCountFamily() {
    return this.http.get(environment.endpoint + 'counting/family-members');
  }

  // Crear un usuario
  create(bodeObject: any) {
    return this.http.post(environment.endpoint + 'users', bodeObject, {})
  }

  // Crear un usuario
  update(bodeObject: any, id: number): Observable<UserInfo> {
    return this.http.post<UserInfo>(environment.endpoint + 'users/' + id, bodeObject, {})
  }

  // Cambiar de rol: normal, profesor, familiar
  setRol(endpoint: string): Observable<UserInfo> {
    return this.http.post<UserInfo>(environment.endpoint + 'users/' + endpoint, {}, {});
  }
}
