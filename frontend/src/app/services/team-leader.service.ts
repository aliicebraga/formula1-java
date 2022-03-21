import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamLeader } from '../models/teamLeaderModel';

@Injectable({
  providedIn: 'root'
})
export class TeamLeaderService {

  baseUrl: String = 'http://localhost:8080/formulaOne'

  constructor(private http: HttpClient) { }

  // route to add
  insertTeamLeader(leader: TeamLeader): Observable<TeamLeader> {
    return this.http.post<TeamLeader>(`${this.baseUrl}/teamLeader`, leader)
  }
  //route to add with team
  insertTeamLeaderWithTeam(idTeam: string, leader: TeamLeader): Observable<TeamLeader> {
    return this.http.post<TeamLeader>(`${this.baseUrl}/teamLeader?team=${idTeam}`, leader)
  }

  // route to list all
  findAllTeamLeaders(): Observable<TeamLeader[]> {
    return this.http.get<TeamLeader[]>(`${this.baseUrl}/teamLeaders`)
  }
  // route to list all active
  findAllActivesTeamLeaders(): Observable<TeamLeader[]> {
    return this.http.get<TeamLeader[]>(`${this.baseUrl}/activesTeamLeaders`)
  }
  // route to list leaders with team info
  findLeadersRightTeam(): Observable<TeamLeader[]> {
    return this.http.get<TeamLeader[]>(`${this.baseUrl}/leadersRightTeam`)
  }
  // route to list one specific
  findOneTeamLeader(idTeamLeader: string): Observable<TeamLeader> {
    return this.http.get<TeamLeader>(`${this.baseUrl}/teamLeader/${idTeamLeader}`)
  }
  // route to list all from a specific parameter
  findTeamLeaderByTeam(idTeam: string): Observable<TeamLeader> {
    return this.http.get<TeamLeader>(`${this.baseUrl}/teamLeaderByTeam/${idTeam}`)
  }
  // route to list all leaders that doesnt have a team
  findAllTeamLeadersTeamNull(): Observable<TeamLeader[]> {
    return this.http.get<TeamLeader[]>(`${this.baseUrl}/teamLeaderTeamNull`)
  }
  // route to list all available
  findAllAvailableTeamLeaders(): Observable<TeamLeader[]> {
    return this.http.get<TeamLeader[]>(`${this.baseUrl}/availableTeamLeaders`)
  }

  //route to edit
  editTeamLeader(idTeamLeader: string, leader: TeamLeader): Observable<TeamLeader> {
    return this.http.put<TeamLeader>(`${this.baseUrl}/teamLeader/${idTeamLeader}`, leader)
  }

  //route to leave team leader without team
  leaveLeaderWithoutTeam(idTeamLeader: any, leader: TeamLeader): Observable<TeamLeader> {
    return this.http.put<TeamLeader>(`${this.baseUrl}/leaveTeam/teamLeader/${idTeamLeader}`, leader)
  }

  //route to edit with team
  editTeamLeaderWithTeam(idTeam: string, leader: TeamLeader): Observable<TeamLeader> {
    return this.http.put<TeamLeader>(`${this.baseUrl}/teamLeader/${leader.idTeamLeader}?team=${idTeam}`, leader)
  }

  //route to delete forever
  deleteTeamLeader(idTeamLeader: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/teamLeader/${idTeamLeader}`)
  }
  //route to soft delete
  softDeleteTeamLeader(idTeamLeader: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/softDeleteTeamLeader/${idTeamLeader}`)
  }

}
