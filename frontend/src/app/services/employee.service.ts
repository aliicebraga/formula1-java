import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employeeModel';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl: String = 'http://localhost:8080/formulaOne'

  constructor(private http: HttpClient) { }

  // route to add
  insertEmployee(idRole: string, employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseUrl}/employee?role=${idRole}`, employee)
  }

  // route to add
  insertEmployeeWithTeam(idRole: string, idTeam: string, employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseUrl}/employee?role=${idRole}&team=${idTeam}`, employee)
  }

  // route to list all
  findAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/employees`)
  }
  // route to list all active
  findAllActivesEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/activesEmployees`)
  }
  // route to list one specific
  findOneEmployee(idEmployee: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/employee/${idEmployee}`)
  }
  // route to list all from a specific parameter
  findEmployeeByTeam(idTeam: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/employeesByTeam/${idTeam}`)
  }

  // route to list all associated
  findAllEmployeesWithTeam(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/employeeWithTeam`)
  }

  // route to list all that doesnt have a team
  findAllEmployeesTeamNull(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/employeesTeamNull`)
  }

  // route to list all available employees
  findAllAvailableEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/availableEmployees`)
  }


  //route to edit
  editEmployee(idRole: string, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}/employee/${employee.idEmployee}?role=${idRole}`, employee)
  }

  //route to edit with team
  editEmployeeWithTeam(idRole: any, idTeam: string, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}/employee/${employee.idEmployee}?role=${idRole}&team=${idTeam}`, employee)
  }

  //route to edit
  leaveEmployeeWithoutTeam(idRole: any, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}/leaveTeam/employee/${employee.idEmployee}?role=${idRole}`, employee)
  }

  //route to delete forever
  deleteEmployee(idEmployee: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/employee/${idEmployee}`)
  }
  //route to soft delete
  softDeleteEmployee(idEmployee: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/softDeleteEmployee/${idEmployee}`)
  }

}
