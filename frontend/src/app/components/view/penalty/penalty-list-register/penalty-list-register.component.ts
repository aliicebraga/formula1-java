import { TeamService } from 'src/app/services/team.service';
import { Penalty } from './../../../../models/PenaltyModel';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Role } from 'src/app/models/roleModel';
import { PenaltyService } from 'src/app/services/penalty.service';
import { RoleService } from 'src/app/services/role.service';
import { Team } from 'src/app/models/teamModel';

@Component({
  selector: 'app-penalty-list-register',
  templateUrl: './penalty-list-register.component.html',
  styleUrls: ['./penalty-list-register.component.css']
})
export class PenaltyListRegisterComponent implements OnInit {

  idRoute: any
  idTeamSelected: any

  tituloModal: string = ''
  mensagemModal: string = ''
  valuePB = 0

  tituloPage: string = 'New penalty'
  tituloButton: string = 'Register'

  clicked = false;

  penalty: Penalty = {
    peDescription: '',
    peDueDate: '',
    peValue: '',
    peStatus: 'PENDING',
    team: {
      idTeam: '',
      teamName: "",
      teamDateOfCreation: "",
      teamDateOfEntry: "",
      teamEngineSuplier: "",
      teamLogo: "",
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
  }

  teams: Team[] = []

  constructor(private penaltyService: PenaltyService, private router: Router, private actRoute: ActivatedRoute, private modalService: NgbModal, private teamService: TeamService) {
    this.idRoute = this.actRoute.snapshot.params['id']
  }

  ngOnInit(): void {
    this.listTeams()
    console.log("TO NO REGISTER");
    if (this.idRoute != undefined) {
      this.tituloPage = 'Edit penalty'
      this.tituloButton = 'Edit'
      this.initForm()
    }

  }

  initForm() {
    this.penaltyService.findOnePenalty(this.idRoute).subscribe(res => {
      this.penalty = res
      this.penalty.peDueDate = res.peDueDate.slice(0, 10)
      console.log(res);

    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalService.open(template, { centered: true });
    this.router.navigate([`/penalties`])

  }


  onSubmit(template: TemplateRef<any>) {
    this.clicked = true;
    if (this.idRoute != undefined) {
      // edit
      this.edit(template)
    } else {
      // register
      this.register(template)
    }
  }

  register(template: TemplateRef<any>) {
    this.penaltyService.insertPenalty(this.penalty.team.idTeam, this.penalty).subscribe({
      next: () => {
        this.tituloModal = `Success!!!`
        this.mensagemModal = `New penalty registered!`
        console.log(this.penalty);

        this.openModal(template)
      },
      error: erro => {
        this.tituloModal = `Failed.`
        this.mensagemModal = `Failed to register a new penalty.`
        console.log(this.penalty);

        this.openModal(template)
      },
      complete: () => {
        console.info('Complete')
      }
    })
  }


  edit(template: TemplateRef<any>) {
    this.penaltyService.editPenalty(this.penalty.team.idTeam, this.idRoute, this.penalty).subscribe({
      next: () => {
        this.tituloModal = `Success!!!`
        this.mensagemModal = `Penalty #${this.idRoute} edited!`
        this.openModal(template)
      },
      error: erro => {
        this.tituloModal = `Failed.`
        this.mensagemModal = `Failed to edit penalty #${this.idRoute}.`
        this.openModal(template)
      },
      complete: () => {
        console.info('Complete')
      }
    })
  }

  listTeams() {
    this.teamService.findAllActivesTeams().subscribe(res => {
      this.teams = res
      console.log(res);
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
