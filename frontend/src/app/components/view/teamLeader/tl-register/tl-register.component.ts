import { TeamLeader } from './../../../../models/teamLeaderModel';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TeamLeaderService } from 'src/app/services/team-leader.service';
import { Team } from 'src/app/models/teamModel';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-tl-register',
  templateUrl: './tl-register.component.html',
  styleUrls: ['./tl-register.component.css']
})
export class TlRegisterComponent implements OnInit {

  idRoute: any
  idTeamChoose: any
  idTeamInit: any


  tituloModal: string = ''
  mensagemModal: string = ''
  valuePB = 0

  tituloPage: string = 'New team leader'
  tituloButton: string = 'Register'

  clicked = false;

  teamLeader: TeamLeader = {
    leaderName: '',
    leaderDateOfEntry: undefined,
    leaderNationality: '',
    leaderChampionshipsWon: '',
    leaderPhoto: null,
    leaderActive: true,
  }

  teams: Team[] = []


  constructor(private teamLeaderService: TeamLeaderService, private router: Router, private actRoute: ActivatedRoute, private modalService: NgbModal, private teamService: TeamService) {
    this.idRoute = this.actRoute.snapshot.params['id']
  }

  ngOnInit(): void {
    this.listTeams()
    if (this.idRoute != undefined) {
      this.tituloPage = 'Edit team leader'
      this.tituloButton = 'Edit'
      this.getTeamByTeamLeader()
      this.initForm()
    }

  }

  initForm() {
    this.teamLeaderService.findOneTeamLeader(this.idRoute).subscribe((res: TeamLeader) => {
      this.teamLeader = res
      this.teamLeader.leaderDateOfEntry = res.leaderDateOfEntry.slice(0, 10)
      console.log(res);
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalService.open(template, { centered: true });
    this.router.navigate([`/teamLeaders`])
  }


  onSubmit(template: TemplateRef<any>) {
    this.clicked = true;
    // this.idTeam = ''
    console.log(this.idTeamChoose);

    if (this.idRoute != undefined) {
      // edit
      if (this.idTeamChoose == 'None') {
        //no team choose
        this.edit(template)
      } else {
        //team choose
        this.editWhitTeam(template)
      }
    } else {
      // register
      if (this.idTeamChoose == 'None') {
        //no team choose
        this.register(template)
        console.log("register");

      } else {
        //team choose
        this.registerWithTeam(template)
        console.log("register with team" + this.idTeamChoose);

      }
    }
  }

  register(template: TemplateRef<any>) {
    this.teamLeaderService.insertTeamLeader(this.teamLeader).subscribe({
      next: () => {
        this.tituloModal = `Success!!!`
        this.mensagemModal = `New team leader registered!`
        this.openModal(template)
      },
      error: erro => {
        this.tituloModal = `Failed.`
        this.mensagemModal = `Failed to register a new team leader.`
        this.openModal(template)
      },
      complete: () => {
        console.info('Complete')
      }
    })
  }

  registerWithTeam(template: TemplateRef<any>) {
    this.teamLeaderService.insertTeamLeaderWithTeam(this.idTeamChoose, this.teamLeader).subscribe({
      next: () => {
        this.tituloModal = `Success!!!`
        this.mensagemModal = `New team leader registered in team #${this.idTeamChoose}!`
        this.openModal(template)
      },
      error: erro => {
        this.tituloModal = `Failed.`
        this.mensagemModal = `Failed to register a new team leader in team #${this.idTeamChoose}.`
        this.openModal(template)
      },
      complete: () => {
        console.info('Complete')
      }
    })
  }

  edit(template: TemplateRef<any>) {
    this.teamLeaderService.editTeamLeader(this.idRoute, this.teamLeader).subscribe({
      next: () => {
        this.tituloModal = `Success!!!`
        this.mensagemModal = `Team leader #${this.idRoute} edited!`
        this.openModal(template)
      },
      error: erro => {
        this.tituloModal = `Failed.`
        this.mensagemModal = `Failed to edit team leader #${this.idRoute}.`
        this.openModal(template)
      },
      complete: () => {
        console.info('Complete')
      }
    })
  }

  editWhitTeam(template: TemplateRef<any>) {
    this.teamLeaderService.editTeamLeaderWithTeam(this.idTeamInit, this.teamLeader).subscribe({
      next: () => {
        this.tituloModal = `Success!!!`
        this.mensagemModal = `Team leader #${this.idRoute} in team #${this.idTeamInit} edited!`
        this.openModal(template)
      },
      error: erro => {
        this.tituloModal = `Failed.`
        this.mensagemModal = `Failed to edit team leader #${this.idRoute} in team #${this.idTeamInit}.`
        this.openModal(template)
      },
      complete: () => {
        console.info('Complete')
      }
    })
  }

  listTeams() {
    this.teamService.findAllAvailableTeams().subscribe(res => {
      this.teams = res
      console.log(res);
    })
  }

  getTeamByTeamLeader() {
    this.teamService.findTeamLeaderByTeam(this.idRoute).subscribe(res => {
      this.idTeamInit = res.idTeam
      console.log(this.idTeamInit);
    })
  }

  updateProgressBar(input: any, value: any) {
    if (input.valid) {
      this.valuePB += value
    }
  }

  // //return page
  return() {
    window.history.go(-1)
  }
}
