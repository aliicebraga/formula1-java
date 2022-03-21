import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Team } from 'src/app/models/teamModel';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-register',
  templateUrl: './team-register.component.html',
  styleUrls: ['./team-register.component.css']
})
export class TeamRegisterComponent implements OnInit {

  idRoute: any

  tituloModal: string = ''
  mensagemModal: string = ''
  valuePB = 0

  tituloPage: string = 'New team'
  tituloButton: string = 'Register'

  clicked = false;

  team: Team = {
    teamName: '',
    teamDateOfCreation: '',
    teamDateOfEntry: '',
    teamEngineSuplier: '',
    // teamSponsors: '',
    teamLogo: null,
    teamActive: true,
  }


  constructor(private teamService: TeamService, private router: Router, private actRoute: ActivatedRoute, private modalService: NgbModal) {
    this.idRoute = this.actRoute.snapshot.params['id']
  }

  ngOnInit(): void {
    console.log("TO NO REGISTER");
    if (this.idRoute != undefined) {
      this.tituloPage = 'Edit team'
      this.tituloButton = 'Edit'
      this.initForm()
    }

  }

  initForm() {
    this.teamService.findOneTeam(this.idRoute).subscribe(res => {
      this.team = res
      this.team.teamDateOfCreation = res.teamDateOfCreation.slice(0, 10)
      this.team.teamDateOfEntry = res.teamDateOfEntry.slice(0, 10)

      console.log(res);

    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalService.open(template, { centered: true });
    this.router.navigate([`/teams`])
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
    this.teamService.insertTeam(this.team).subscribe({
      next: () => {
        this.tituloModal = `Success!!!`
        this.mensagemModal = `New team registered!`
        this.openModal(template)
      },
      error: erro => {
        this.tituloModal = `Failed.`
        this.mensagemModal = `Failed to register a new team.`
        this.openModal(template)
        // this.router.navigate([`/teams`])
      },
      complete: () => {
        console.info('Complete')
      }
    })
  }

  edit(template: TemplateRef<any>) {
    this.teamService.editTeam(this.idRoute, this.team).subscribe({
      next: () => {
        this.tituloModal = `Success!!!`
        this.mensagemModal = `Team #${this.idRoute} edited!`
        this.openModal(template)
      },
      error: erro => {
        this.tituloModal = `Failed.`
        this.mensagemModal = `Failed to edit team #${this.idRoute}.`
        this.openModal(template)
        // this.router.navigate([`/teams`])
      },
      complete: () => {
        console.info('Complete')
      }
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
