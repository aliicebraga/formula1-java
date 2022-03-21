import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TeamLeader } from './../../../../models/teamLeaderModel';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { TeamLeaderService } from 'src/app/services/team-leader.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-tl-list-all',
  templateUrl: './tl-list-all.component.html',
  styleUrls: ['./tl-list-all.component.css']
})
export class TlListAllComponent implements OnInit {
  teamLeaders: TeamLeader[] = []
  teamLeaderWithTeam: any

  teamLeaderName: string = ''
  teamLeaderId: any
  formData: any

  titleModal: string = ''
  messageModal: string = ''

  constructor(private teamLeaderService: TeamLeaderService, private modalService: NgbModal, private http: HttpClient, private router: Router, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // this.getAll()
    this.getAllWhitTeamInfo()
  }

  // /////// list all team leaders
  // getAll() {
  //   this.teamLeaderService.findAllActivesTeamLeaders().subscribe((res) => {
  //     console.log(res);

  //     this.teamLeaders = res;
  //   })
  // }

  /////// list all team leaders whit team info
  getAllWhitTeamInfo() {
    this.teamLeaderService.findLeadersRightTeam().subscribe((res) => {
      console.log(res);
      // [0] - idTeamLeader
      // [1] - leaderName
      // [2] - leaderPhoto
      // [3] - idTeam
      // [4] - teamName
      // [5] - teamLogo
      this.teamLeaderWithTeam = res;


    })
  }

  ////////// soft delete team leader
  deleteTeamLeader(template: TemplateRef<any>) {
    this.teamLeaderService.softDeleteTeamLeader(this.teamLeaderId).subscribe({
      next: () => {
        // alert("team deleted-> id: " + this.teamFileId)
      },
      error: erro => {
        // alert("error deleting team -> id: " + this.teamFileId)
        this.titleModal = "NOT deleted!"
        this.messageModal = `Team leader ${this.teamLeaderName} NOT deleted.`
        this.onlyOpenModal(template)

      },
      complete: () => {
        console.info('Complete')
        this.titleModal = "Team leader deleted!"
        this.messageModal = `Team leader ${this.teamLeaderName} successfully deleted.`
        this.onlyOpenModal(template)
      }

    })
  }


  ///////// open modal and pass team leader
  openModal(template: TemplateRef<any>, teamLeaderID: string, teamLeaderName: string) {
    this.modalService.open(template, { centered: true });
    this.teamLeaderId = teamLeaderID
    this.teamLeaderName = teamLeaderName
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
      `http://localhost:8080/formulaOne/teamLeader/send/${this.teamLeaderId}?fileName=${this.teamLeaderName}`, this.formData
    )
      .subscribe({
        next: () => {
          // alert("Foto anexada no time de id: " + this.teamFileId)
        },
        error: erro => {
          alert("Erro ao anexar foto de id: " + this.teamLeaderId)
        },
        complete: () => {
          console.info('Complete')
          this.titleModal = "Photo updated!"
          this.messageModal = "Photo successfully updated, please refresh the page and see the changes"
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
