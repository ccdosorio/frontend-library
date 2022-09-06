import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInfo } from '@models';
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

  // Crear un usuario
  create(bodeObject: any) {
    return this.http.post(environment.endpoint + 'users', bodeObject, {})
  }

  // Crear un usuario
  update(bodeObject: any, id: number): Observable<UserInfo> {
    return this.http.post<UserInfo>(environment.endpoint + 'users/' + id, bodeObject, {})
  }

  // Cambiar de rol: normal, profesor, familiar
  setRol(endpoint: string) {
    return this.http.post(environment.endpoint + 'users/' + endpoint, {}, {});
  }
}
