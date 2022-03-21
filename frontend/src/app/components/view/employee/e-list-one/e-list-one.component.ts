import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from 'src/app/models/employeeModel';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-e-list-one',
  templateUrl: './e-list-one.component.html',
  styleUrls: ['./e-list-one.component.css']
})
export class EListOneComponent implements OnInit {
  idRoute: any

  employees: Employee[] = []

  employeeTeam: string = ''
  employeeName: string = ''
  employeeId: any
  formData: any

  titleModal: string = ''
  messageModal: string = ''

  employeeChoose: Employee = {
    empName: '',
    empBirth: undefined,
    empContact: '',
    empNationality: '',
    role: {
      idRole: '',
      roleName: '',
      roleDepartment: '',
      roleAssignment: ''
    },
    empWage: undefined,
    empPhoto: undefined,
    empActive: false,
    team: undefined
  }

  constructor(private employeeService: EmployeeService, private modalService: NgbModal, private http: HttpClient, private router: Router, private actRoute: ActivatedRoute) {
    this.idRoute = this.actRoute.snapshot.params['id']
  }

  ngOnInit(): void {
    this.getAllByTeam()
  }

  ////list all employees
  getAllByTeam() {
    this.employeeService.findEmployeeByTeam(this.idRoute).subscribe(res => {
      this.employees = res
    })
  }

  ////////// soft delete team leader
  deleteEmployee(template: TemplateRef<any>) {
    this.employeeService.softDeleteEmployee(this.employeeId).subscribe({
      next: () => {
        // alert("team deleted-> id: " + this.teamFileId)
      },
      error: erro => {
        // alert("error deleting team -> id: " + this.teamFileId)
        this.titleModal = "NOT deleted!"
        this.messageModal = `Employee ${this.employeeName} NOT deleted.`
        this.onlyOpenModal(template)

      },
      complete: () => {
        console.info('Complete')
        this.titleModal = "Employee deleted!"
        this.messageModal = `Employee ${this.employeeName} successfully deleted.`
        this.onlyOpenModal(template)
      }

    })
  }

  //leave team without team leader
  leaveEmployeeWithoutTeam(template: TemplateRef<any>) {
    this.employeeService.leaveEmployeeWithoutTeam(this.employeeChoose.role.idRole, this.employeeChoose).subscribe({
      next: () => {
        this.titleModal = `Success!!!`
        this.messageModal = `Employee #${this.employeeChoose.idEmployee} edited! No team related.`
        this.onlyOpenModal(template)
      },
      error: erro => {
        this.titleModal = `Failed.`
        this.messageModal = `Failed to edit employee #${this.employeeChoose.idEmployee}. Not possible to disassociate team.`
        this.onlyOpenModal(template)
      },
      complete: () => {
        console.info('Complete')
      }
    })
  }


  ///////// open modal and pass team leader
  openModal(template: TemplateRef<any>, employee: Employee) {
    this.modalService.open(template, { centered: true });
    this.employeeName = employee.empName
    this.employeeId = employee.idEmployee
    this.employeeChoose = employee
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
      `http://localhost:8080/formulaOne/employee/send/${this.employeeId}?fileName=${this.employeeName}`, this.formData
    )
      .subscribe({
        next: () => {
          // alert("Foto anexada no time de id: " + this.teamFileId)
        },
        error: erro => {
          alert("Erro ao anexar foto de id: " + this.employeeId)
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
