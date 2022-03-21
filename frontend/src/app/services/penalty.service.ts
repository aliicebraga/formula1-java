import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Penalty } from '../models/PenaltyModel';

@Injectable({
  providedIn: 'root'
})
export class PenaltyService {

  baseUrl: String = 'http://localhost:8080/formulaOne'

  constructor(private http: HttpClient) { }

  // route to add
  insertPenalty(idTeam: any, penalty: Penalty): Observable<Penalty> {
    return this.http.post<Penalty>(`${this.baseUrl}/penalty/${idTeam}`, penalty)
  }

  // route to list all
  findAllPenalties(): Observable<Penalty[]> {
    return this.http.get<Penalty[]>(`${this.baseUrl}/penalties`)
  }

  // route to list one specific
  findOnePenalty(code: string): Observable<Penalty> {
    return this.http.get<Penalty>(`${this.baseUrl}/penalty/${code}`)
  }

  // route to list all penalties by team
  findPenaltiesByTeam(idTeam: string): Observable<Penalty[]> {
    return this.http.get<Penalty[]>(`${this.baseUrl}/penalties/team/${idTeam}`)
  }

  //route to edit
  editPenalty(idTeam: any, code: string, penalty: Penalty): Observable<Penalty> {
    return this.http.put<Penalty>(`${this.baseUrl}/penalty/${code}?team=${idTeam}`, penalty)
  }

  //route to delete forever
  deletePenalty(code: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/penalty/${code}`)
  }

  //route to complete penalty
  completePenalty(code: string, penalty: Penalty): Observable<Penalty> {
    return this.http.put<Penalty>(`${this.baseUrl}/team/penalty/complete/${code}`, penalty)
  }
  //route to cancel penalty
  cancelPenalty(code: string, penalty: Penalty): Observable<Penalty> {
    return this.http.put<Penalty>(`${this.baseUrl}/team/penalty/cancel/${code}`, penalty)
  }
}
