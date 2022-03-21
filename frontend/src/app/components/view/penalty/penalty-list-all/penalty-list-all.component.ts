import { Penalty } from './../../../../models/PenaltyModel';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Role } from 'src/app/models/roleModel';
import { RoleService } from 'src/app/services/role.service';
import { PenaltyService } from 'src/app/services/penalty.service';

@Component({
  selector: 'app-penalty-list-all',
  templateUrl: './penalty-list-all.component.html',
  styleUrls: ['./penalty-list-all.component.css']
})
export class PenaltyListAllComponent implements OnInit {
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
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  ///////////list all teams
  getAll() {
    this.penaltyService.findAllPenalties().subscribe((res) => {
      console.log(res);
      this.penalties = res;
    });
  }

  ////////// delete penalty
  deletePenalty(template: TemplateRef<any>) {
    this.penaltyService.deletePenalty(this.penaltyId).subscribe({
      next: () => {
      },
      error: erro => {
        this.titleModal = "NOT deleted!"
        this.messageModal = `Penalty ${this.penaltyName} NOT deleted.`
        this.onlyOpenModal(template)

      },
      complete: () => {
        console.info('Complete')
        this.titleModal = "Penalty deleted!"
        this.messageModal = `Penalty ${this.penaltyName} successfully deleted.`
        this.onlyOpenModal(template)
      }

    })
  }

  ////////// cancel penalty
  cancelPenalty(template: TemplateRef<any>) {
    this.penaltyService.cancelPenalty(this.penaltyId, this.penalty).subscribe({
      next: () => {
      },
      error: erro => {
        this.titleModal = "NOT cancelled!"
        this.messageModal = `Penalty ${this.penaltyName} NOT canceled.`
        this.onlyOpenModal(template)

      },
      complete: () => {
        console.info('Complete')
        this.titleModal = "Penalty cancelled!"
        this.messageModal = `Penalty ${this.penaltyName} successfully canceled.`
        this.onlyOpenModal(template)
      }

    })
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
