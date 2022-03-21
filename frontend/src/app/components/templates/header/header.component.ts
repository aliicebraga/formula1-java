import { TeamService } from './../../../services/team.service';
import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/models/teamModel';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  teams: Team[] = []


  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
    this.getAll();
  }

  ///////////list all teams
  getAll() {
    this.teamService.findAllActivesTeams().subscribe((res) => {
      this.teams = res;
    });
  }



}
