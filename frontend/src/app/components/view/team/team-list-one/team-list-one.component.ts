import { PenaltyService } from 'src/app/services/penalty.service';
import { Penalty } from './../../../../models/PenaltyModel';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employeeModel';
import { TeamLeader } from './../../../../models/teamLeaderModel';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from './../../../../services/team.service';
import { Team } from './../../../../models/teamModel';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TeamLeaderService } from 'src/app/services/team-leader.service';

@Component({
  selector: 'app-team-list-one',
  templateUrl: './team-list-one.component.html',
  styleUrls: ['./team-list-one.component.css']
})
export class TeamListOneComponent implements OnInit {

  errorMessage: any

  idRoute: string = ''

  modalMessage: string = ''

  teamName: string = ''
  teamId: any

  titleModal: string = ''
  messageModal: string = ''


  team: Team = {
    teamName: '',
    teamDateOfCreation: undefined,
    teamDateOfEntry: undefined,
    teamEngineSuplier: '',
    teamLogo: undefined,
    teamActive: true,
    employee: [],
    teamLeader: {
      idTeamLeader: '',
      leaderName: ' ',
      leaderDateOfEntry: ' ',
      leaderNationality: ' ',
      leaderChampionshipsWon: ' ',
      leaderPhoto: ' ',
      leaderActive: true,
    }
  }

  teamLeaderChoose: any
  teamLeaders: TeamLeader[] = []

  employeeChoose: any
  employees: Employee[] = []

  penalties: Penalty[] = []

  constructor(private teamService: TeamService, private actRoute: ActivatedRoute, private router: Router, private modalService: NgbModal, private teamLeaderService: TeamLeaderService, private employeeService: EmployeeService, private penaltyService: PenaltyService) {
    this.idRoute = this.actRoute.snapshot.params['id']
  }

  ngOnInit(): void {
    this.getOne()
    this.listLeadersAvailable()
    this.listEmployeesAvailable()
    this.listPenalties()
  }

  // get one team
  getOne() {
    this.teamService.findOneTeam(this.idRoute).subscribe({
      next: (res) => {
        this.team = res
      },
      error: (error) => {                              //Error callback
        console.error('error caught in component')
        this.errorMessage = error;
        this.router.navigate(['/teams'])
      }

    })
  }

  //leave team without team leader
  leaveTeamWithoutTeamLeader(template: TemplateRef<any>, teamLeader: TeamLeader) {
    this.teamLeaderService.leaveLeaderWithoutTeam(teamLeader.idTeamLeader, teamLeader).subscribe({
      next: () => {
        this.titleModal = `Success!!!`
        this.messageModal = `Team #${this.idRoute} edited! No team leader related.`
        this.onlyOpenModal(template)
      },
      error: erro => {
        this.titleModal = `Failed.`
        this.messageModal = `Failed to edit team #${this.idRoute}. Not possible to disassociate team leader.`
        this.onlyOpenModal(template)
      },
      complete: () => {
        console.info('Complete')
      }
    })

    // console.log(teamLeader);

  }

  //list leaders available
  listLeadersAvailable() {
    this.teamLeaderService.findAllAvailableTeamLeaders().subscribe(res => {
      this.teamLeaders = res
    })
  }

  //list leaders available
  listEmployeesAvailable() {
    this.employeeService.findAllAvailableEmployees().subscribe(res => {
      this.employees = res
    })
  }

  //add team leader
  addTeamLeader(template: TemplateRef<any>) {
    this.titleModal = `About team leader`
    if (this.teamLeaderChoose == 'None' || this.teamLeaderChoose == undefined) {
      this.modalMessage = 'No team leader chosen.'
    } else {
      this.teamLeaderService.editTeamLeaderWithTeam(this.idRoute, this.teamLeaderChoose).subscribe({
        next: () => {
          this.messageModal = `New team leader assigned!`
        },
        error: erro => {
          this.messageModal = `Failed to assign new team leader.`
          this.onlyOpenModal(template)
        },
        complete: () => {
          this.onlyOpenModal(template)
          console.info('Complete')
        }
      })
    }
  }

  //add team leader
  addEmployee(template: TemplateRef<any>) {
    this.titleModal = `About employee`
    console.log(this.employeeChoose);

    if (this.employeeChoose == 'None' || this.employeeChoose == undefined) {
      this.modalMessage = 'No employee chosen.'
    } else {
      this.employeeService.editEmployeeWithTeam(this.employeeChoose.role.idRole, this.idRoute, this.employeeChoose).subscribe({
        next: () => {
          this.messageModal = `New employee assigned!`
        },
        error: erro => {
          this.messageModal = `Failed to assign employee leader.`
          this.onlyOpenModal(template)
        },
        complete: () => {
          this.onlyOpenModal(template)
          // let currentUrl = this.router.url;
          // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          //   this.router.navigate([currentUrl]);
          // });
          console.info('Complete')
        }
      })
    }

  }


  ////////// soft delete team
  deleteTeam(template: TemplateRef<any>) {
    this.teamService.softDeleteTeam(this.teamId).subscribe({
      next: () => {
        // alert("team deleted-> id: " + this.teamFileId)
      },
      error: erro => {
        // alert("error deleting team -> id: " + this.teamFileId)
        this.titleModal = "NOT deleted!"
        this.messageModal = `Team ${this.teamName} NOT deleted.`
        this.onlyOpenModal(template)

      },
      complete: () => {
        console.info('Complete')
        this.titleModal = "Team deleted!"
        this.messageModal = `Team ${this.teamName} successfully deleted.`
        this.onlyOpenModal(template)
      }

    })
  }


  listPenalties() {
    this.penaltyService.findPenaltiesByTeam(this.idRoute).subscribe((res) => {
      console.log(res);
      this.penalties = res;
    });
  }

  ///////// open modal and pass team
  openModal(template: TemplateRef<any>, team: Team) {
    this.modalService.open(template, { centered: true });
    this.teamName = team.teamName
    this.teamId = team.idTeam
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
