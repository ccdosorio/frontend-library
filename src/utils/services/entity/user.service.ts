import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }
  
  // Obtener los datos del usuario authenticado
  getUser() {
    return this.http.get(environment.endpoint + 'users', {});
  }

  // Crear un usuario
  create(bodeObject: any) {
    return this.http.post(environment.endpoint + 'users', bodeObject, {})
  }
}
