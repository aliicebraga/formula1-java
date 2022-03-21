import { TeamService } from 'src/app/services/team.service';
import { Team } from 'src/app/models/teamModel';
import { RoleService } from 'src/app/services/role.service';
import { EmployeeService } from './../../../../services/employee.service';
import { Employee } from './../../../../models/employeeModel';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-e-list-all',
  templateUrl: './e-list-all.component.html',
  styleUrls: ['./e-list-all.component.css']
})
export class EListAllComponent implements OnInit {

  employees: any = []

  employeeTeam: string = ''
  employeeName: string = ''
  employeeId: any
  formData: any

  titleModal: string = ''
  messageModal: string = ''

  teams: Team[] = []

  teamChoose: any

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

  constructor(private employeeService: EmployeeService, private modalService: NgbModal, private http: HttpClient, private router: Router, private actRoute: ActivatedRoute, private roleService: RoleService, private teamService: TeamService) {
    this.getAllRightTeam()

  }

  ngOnInit(): void {
    // this.getAll()
    this.listTeamsActive()
  }

  ////list all employees
  // getAll() {
  //   this.employeeService.findAllActivesEmployees().subscribe(res => {
  //     this.employees = res
  //   })
  // }

  //list all employees right join with team]
  getAllRightTeam() {
    this.employeeService.findAllEmployeesWithTeam().subscribe(res => {
      console.log(res);

      res.forEach((employee: any) => {
        let employeeWithTeam: any = {
          idEmployee: '',
          empName: '',
          empPhoto: '',
          role: {
            idRole: '',
            roleName: '',
          },
          empBirth: '',
          empContact: '',
          empNationality: '',
          empWage: '',
          team: {
            idTeam: '',
            teamName: '',
            teamLogo: ''
          }
        }
        employeeWithTeam.idEmployee = employee[0]
        employeeWithTeam.empName = employee[1]
        employeeWithTeam.empPhoto = employee[2]
        if (employee[3] != null) {
          employeeWithTeam.role.idRole = employee[3]
          this.roleService.findOneRole(employeeWithTeam.role.idRole).subscribe(res => {
            employeeWithTeam.role.roleName = res.roleName
          })
        }
        employeeWithTeam.empBirth = employee[4]
        employeeWithTeam.empContact = employee[5]
        employeeWithTeam.empNationality = employee[6]
        employeeWithTeam.empWage = employee[7]
        employeeWithTeam.team.idTeam = employee[8]
        employeeWithTeam.team.teamName = employee[9]
        employeeWithTeam.team.teamLogo = employee[10]


        this.employees.push(employeeWithTeam)
      })
    })
    console.log(this.employees);

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




  ///////// open modal and pass team leader
  openModal(template: TemplateRef<any>, employee: Employee) {
    this.modalService.open(template, { centered: true });
    this.employeeChoose.idEmployee = employee.idEmployee
    this.employeeChoose.empName = employee.empName
    this.employeeChoose.empBirth = employee.empBirth
    this.employeeChoose.empContact = employee.empContact
    this.employeeChoose.empNationality = employee.empNationality
    this.employeeChoose.role.idRole = employee.role.idRole
    this.employeeChoose.empWage = employee.empWage
    this.employeeChoose.empPhoto = employee.empPhoto
    this.employeeChoose.empActive = true

    this.employeeTeam = employee.team.teamName
    this.employeeName = employee.empName
    this.employeeId = employee.idEmployee

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

  //list teams available
  listTeamsActive() {
    this.teamService.findAllActivesTeams().subscribe(res => {
      this.teams = res
    })
  }

  addTeam(template: TemplateRef<any>) {
    this.titleModal = `About employee `
    if (this.teamChoose == 'None' || this.teamChoose == undefined) {
      this.messageModal = 'No team chosen.'
    } else {
      this.employeeService.editEmployeeWithTeam(this.employeeChoose.role.idRole, this.teamChoose.idTeam, this.employeeChoose).subscribe({
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

  // //reload page
  reload() {
    window.history.go(0)
  }
  // //return page
  return() {
    window.history.go(-1)
  }

}
