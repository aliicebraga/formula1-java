import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/roleModel';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  baseUrl: String = 'http://localhost:8080/formulaOne'

  constructor(private http: HttpClient) { }

  // route to add
  insertRole(role: Role): Observable<Role> {
    return this.http.post<Role>(`${this.baseUrl}/role`, role)
  }

  // route to list all
  findAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.baseUrl}/roles`)
  }

  // route to list one specific
  findOneRole(idRole: string): Observable<Role> {
    return this.http.get<Role>(`${this.baseUrl}/role/${idRole}`)
  }

  //route to edit
  editRole(id: string, role: Role): Observable<Role> {
    return this.http.put<Role>(`${this.baseUrl}/role/${id}`, role)
  }

  //route to delete forever
  deleteRole(idRole: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/role/${idRole}`)
  }
}
