import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Team } from '../models/teamModel';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  baseUrl: String = 'http://localhost:8080/formulaOne'

  constructor(private http: HttpClient) { }

  // route to add
  insertTeam(team: Team): Observable<Team> {
    return this.http.post<Team>(`${this.baseUrl}/team`, team)
  }

  // route to list all
  findAllTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.baseUrl}/teams`)
  }
  // route to list all active
  findAllActivesTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.baseUrl}/activesTeams`)
  }
  // route to list one specific
  findOneTeam(idTeam: string): Observable<Team> {
    return this.http.get<Team>(`${this.baseUrl}/team/${idTeam}`)
  }
  // route to list all available teams
  findAllAvailableTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.baseUrl}/availableTeams`)
  }

  // route to list one specific
  findTeamLeaderByTeam(idTeamLeader: string): Observable<Team> {
    return this.http.get<Team>(`${this.baseUrl}/team/teamLeader/${idTeamLeader}`)
  }

  //route to edit
  editTeam(id: string, team: Team): Observable<Team> {
    return this.http.put<Team>(`${this.baseUrl}/team/${id}`, team)
  }

  //route to delete forever
  deleteTeam(idTeam: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/team/${idTeam}`)
  }
  //route to soft delete
  softDeleteTeam(idTeam: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/softDeleteTeam/${idTeam}`)
  }
}
