import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Penalty } from 'src/app/models/PenaltyModel';
import { PenaltyService } from 'src/app/services/penalty.service';

@Component({
  selector: 'app-penalty-list-one',
  templateUrl: './penalty-list-one.component.html',
  styleUrls: ['./penalty-list-one.component.css']
})
export class PenaltyListOneComponent implements OnInit {

  idRoute: string = ''

  penalties: Penalty[] = [];

  penaltyName: string = ''
  penaltyId: any

  penalty!: Penalty

  titleModal: string = ''
  messageModal: string = ''



  constructor(
    private penaltyService: PenaltyService,
    private modalService: NgbModal,
    private http: HttpClient,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {
    this.idRoute = actRoute.snapshot.params['id']
  }

  ngOnInit(): void {
    this.getAllByTeam();
  }

  ///////////list all teams
  getAllByTeam() {
    this.penaltyService.findPenaltiesByTeam(this.idRoute).subscribe((res) => {
      console.log(res);
      this.penalties = res;
    });
  }


  ////////// pay/complete penalty
  payPenalty(template: TemplateRef<any>) {
    this.penaltyService.completePenalty(this.penaltyId, this.penalty).subscribe({
      next: () => {
      },
      error: erro => {
        this.titleModal = "NOT paid!"
        this.messageModal = `Penalty ${this.penaltyName} NOT paid.`
        this.onlyOpenModal(template)

      },
      complete: () => {
        console.info('Complete')
        this.titleModal = "Penalty paid!"
        this.messageModal = `Penalty ${this.penaltyName} successfully paid.`
        this.onlyOpenModal(template)
      }

    })
  }


  ///////// open modal and pass team
  openModal(template: TemplateRef<any>, penalty: Penalty) {
    this.modalService.open(template, { centered: true });
    this.penaltyName = penalty.peDescription
    this.penaltyId = penalty.code
    this.penalty = penalty
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
