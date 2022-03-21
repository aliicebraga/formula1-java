import { Team } from 'src/app/models/teamModel';
import { TeamService } from 'src/app/services/team.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TeamLeader } from 'src/app/models/teamLeaderModel';
import { TeamLeaderService } from 'src/app/services/team-leader.service';


@Component({
  selector: 'app-tl-list-one',
  templateUrl: './tl-list-one.component.html',
  styleUrls: ['./tl-list-one.component.css']
})
export class TlListOneComponent implements OnInit {

  idRoute: string = ''

  errorMessage: any;

  titleModal: string = ''
  messageModal: string = ''

  teamLeader: TeamLeader = {
    leaderName: '',
    leaderDateOfEntry: "",
    leaderNationality: '',
    leaderChampionshipsWon: '',
    leaderPhoto: undefined,
    leaderActive: true,
    // idTeam: undefined
  }


  team: Team = {
    teamName: '',
    teamDateOfCreation: undefined,
    teamDateOfEntry: undefined,
    teamEngineSuplier: '',
    teamLogo: undefined,
    teamActive: false
  }

  hasTeam: boolean = false

  teamChoose: any

  teams: Team[] = []

  constructor(private teamLeaderService: TeamLeaderService, private actRoute: ActivatedRoute, private router: Router, private modalService: NgbModal, private teamService: TeamService) {
    this.idRoute = this.actRoute.snapshot.params['id']
  }

  ngOnInit(): void {
    this.getOne()
    this.getOneTeam()
    this.listTeamsAvailable()
  }

  getOne() {
    this.teamLeaderService.findOneTeamLeader(this.idRoute).subscribe({
      next: (res) => {
        this.teamLeader = res
      },
      error: (error) => {                              //Error callback
        console.error('error caught in component')
        this.errorMessage = error;
        this.router.navigate(['/teamLeaders'])
      }
    })
  }

  getOneTeam() {
    this.teamService.findTeamLeaderByTeam(this.idRoute).subscribe({
      next: (res) => {
        console.log(res);
        this.hasTeam = true
        this.team = res
      },
      error: (error) => {                              //Error callback
        this.hasTeam = false
      }

    })
  }

  ////////// soft delete team leader
  deleteTeamLeader(template: TemplateRef<any>) {
    this.teamLeaderService.softDeleteTeamLeader(this.idRoute).subscribe({
      next: () => {
        // alert("team deleted-> id: " + this.teamFileId)
      },
      error: erro => {
        // alert("error deleting team -> id: " + this.teamFileId)
        this.titleModal = "NOT deleted!"
        this.messageModal = `Team leader ${this.teamLeader.leaderName} NOT deleted.`
        this.onlyOpenModal(template)

      },
      complete: () => {
        console.info('Complete')
        this.titleModal = "Team leader deleted!"
        this.messageModal = `Team leader ${this.teamLeader.leaderName} successfully deleted.`
        this.onlyOpenModal(template)
      }

    })
  }

  //leave team without team leader
  leaveTeamWithoutTeamLeader(template: TemplateRef<any>, teamLeader: TeamLeader) {
    this.teamLeaderService.leaveLeaderWithoutTeam(teamLeader.idTeamLeader, teamLeader).subscribe({
      next: () => {
        this.titleModal = `Success!!!`
        this.messageModal = `Team leader #${this.idRoute} edited! No team related.`
        this.onlyOpenModal(template)
      },
      error: erro => {
        this.titleModal = `Failed.`
        this.messageModal = `Failed to edit team #${this.idRoute}. Not possible to disassociate team.`
        this.onlyOpenModal(template)
      },
      complete: () => {
        console.info('Complete')
      }
    })
  }

  //list teams available
  listTeamsAvailable() {
    this.teamService.findAllAvailableTeams().subscribe(res => {
      this.teams = res
    })
  }

  addTeam(template: TemplateRef<any>) {
    this.titleModal = `About team `
    if (this.teamChoose == 'None' || this.teamChoose == undefined) {
      this.messageModal = 'No team chosen.'
    } else {
      this.teamLeaderService.editTeamLeaderWithTeam(this.teamChoose.idTeam, this.teamLeader).subscribe({
        next: () => {
          this.messageModal = `New team assigned!`
        },
        error: erro => {
          this.messageModal = `Failed to assign new team.`
          this.onlyOpenModal(template)
        },
        complete: () => {
          this.onlyOpenModal(template)
          console.info('Complete')
        }
      })
    }
  }

  onlyOpenModal(template: TemplateRef<any>) {
    this.modalService.open(template, { centered: true });
  }

  // //reload page
  reload() {
    window.history.go(0)
  }
  // //return page
  return() {
    window.history.go(-1)
  }

}
