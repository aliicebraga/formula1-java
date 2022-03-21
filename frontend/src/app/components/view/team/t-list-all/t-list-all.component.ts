import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TeamService } from './../../../../services/team.service';
import { Team } from 'src/app/models/teamModel';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-t-list-all',
  templateUrl: './t-list-all.component.html',
  styleUrls: ['./t-list-all.component.css'],
})
export class TListAllComponent implements OnInit {
  teams: Team[] = [];

  teamName: string = ''
  teamId: any
  formData: any

  titleModal: string = ''
  messageModal: string = ''



  constructor(
    private teamService: TeamService,
    private modalService: NgbModal,
    private http: HttpClient,
    private router: Router,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  ///////////list all teams
  getAll() {
    this.teamService.findAllActivesTeams().subscribe((res) => {
      console.log(res);

      this.teams = res;
    });
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


  ///////// open modal and pass team
  openModal(template: TemplateRef<any>, team: Team) {
    this.modalService.open(template, { centered: true });
    this.teamName = team.teamName
    this.teamId = team.idTeam
  }

  onlyOpenModal(template: TemplateRef<any>) {
    this.modalService.open(template, { centered: true });
  }


  //////////// upload file (logo)
  uploadFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.formData = new FormData();
      this.formData.append('photo', event.target.files[0]);
    }
  }

  ////////// send file only if the user save - it prevents the user from giving up
  sendFile(template: TemplateRef<any>) {
    this.http.post(
      `http://localhost:8080/formulaOne/team/send/${this.teamId}?fileName=${this.teamName}`, this.formData
    )
      .subscribe({
        next: () => {
          // alert("Foto anexada no time de id: " + this.teamFileId)
        },
        error: erro => {
          alert("Erro ao anexar foto no time de id: " + this.teamId)
        },
        complete: () => {
          console.info('Complete')
          this.titleModal = "Logo updated!"
          this.messageModal = "Logo successfully updated, please refresh the page and see the changes"
          this.onlyOpenModal(template)
        }
      });
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
