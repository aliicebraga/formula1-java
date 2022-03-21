import { Role } from 'src/app/models/roleModel';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from 'src/app/models/employeeModel';
import { Team } from 'src/app/models/teamModel';
import { EmployeeService } from 'src/app/services/employee.service';
import { TeamService } from 'src/app/services/team.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-e-register',
  templateUrl: './e-register.component.html',
  styleUrls: ['./e-register.component.css']
})
export class ERegisterComponent implements OnInit {

  idRoute: any
  idRole: any
  idTeam: any
  idTeamChoose: any

  tituloModal: string = ''
  mensagemModal: string = ''
  valuePB = 0

  tituloPage: string = 'New employee'
  tituloButton: string = 'Register'

  clicked = false;

  employee: Employee = {
    empName: '',
    empBirth: "",
    empContact: '',
    empNationality: '',
    role: {
      idRole: '',
      roleName: '',
      roleDepartment: '',
      roleAssignment: ''
    },
    empWage: "",
    empPhoto: null,
    empActive: true,
    team: ''
  }

  teams: Team[] = []
  roles: Role[] = []

  constructor(private employeeService: EmployeeService, private router: Router, private actRoute: ActivatedRoute, private modalService: NgbModal, private teamService: TeamService, private roleService: RoleService) {
    this.idRoute = this.actRoute.snapshot.params['id']
    this.idTeam = this.actRoute.snapshot.params['idTeam']

  }

  ngOnInit(): void {
    this.listTeams()
    this.listRoles()
    console.log(this.idTeam);
    if (this.idRoute != undefined) {
      this.tituloPage = 'Edit employee'
      this.tituloButton = 'Edit'
      this.initForm()
    }

  }

  initForm() {
    this.employeeService.findOneEmployee(this.idRoute).subscribe(res => {
      this.employee = res
      this.employee.empBirth = res.empBirth.slice(0, 10)


      console.log(res);

    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalService.open(template, { centered: true });
    this.router.navigate([`/employees`])

  }


  onSubmit(template: TemplateRef<any>) {
    this.clicked = true;
    this.idRole = this.employee.role.idRole
    if (this.idRoute != undefined) {
      // edit

      if (this.idTeam == undefined) {
        //no team choose
        this.edit(template)
      } else {
        //team choose
        this.editWithTeam(template)
      }
    } else {
      // register

      if (this.idTeamChoose == 'None') {
        //no team choose
        this.register(template)

      } else {
        //team choose
        this.registerWithTeam(template)

      }
    }
  }

  register(template: TemplateRef<any>) {
    this.employeeService.insertEmployee(this.idRole, this.employee).subscribe({
      next: () => {
        this.tituloModal = `Success!!!`
        this.mensagemModal = `New employee registered!`
        console.log(this.employee);

        this.openModal(template)
      },
      error: erro => {
        this.tituloModal = `Failed.`
        this.mensagemModal = `Failed to register a new employee.`
        console.log(this.employee);

        this.openModal(template)
      },
      complete: () => {
        console.info('Complete')
      }
    })
  }

  registerWithTeam(template: TemplateRef<any>) {
    this.employeeService.insertEmployeeWithTeam(this.idRole, this.idTeamChoose, this.employee).subscribe({
      next: () => {
        this.tituloModal = `Success!!!`
        this.mensagemModal = `New team employee in team #${this.idTeamChoose}!`
        this.openModal(template)
      },
      error: erro => {
        this.tituloModal = `Failed.`
        this.mensagemModal = `Failed to register a new employee in team #${this.idTeamChoose}.`
        this.openModal(template)
        // this.router.navigate([`/teams`])
      },
      complete: () => {
        console.info('Complete')
      }
    })
  }


  edit(template: TemplateRef<any>) {
    this.employeeService.editEmployee(this.idRole, this.employee).subscribe({
      next: () => {
        this.tituloModal = `Success!!!`
        this.mensagemModal = `Employee #${this.idRoute} edited!`
        this.openModal(template)
      },
      error: erro => {
        this.tituloModal = `Failed.`
        this.mensagemModal = `Failed to edit employee #${this.idRoute}.`
        this.openModal(template)
      },
      complete: () => {
        console.info('Complete')
      }
    })
  }

  editWithTeam(template: TemplateRef<any>) {
    this.employeeService.editEmployeeWithTeam(this.idRole, this.idTeam, this.employee).subscribe({
      next: () => {
        this.tituloModal = `Success!!!`
        this.mensagemModal = `Employee #${this.idRoute} edited!`
        this.openModal(template)
      },
      error: erro => {
        this.tituloModal = `Failed.`
        this.mensagemModal = `Failed to edit employee #${this.idRoute}.`
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

  // getTeamByEmployee(){
  //   this.employeeService.fi
  // }

  listRoles() {
    this.roleService.findAllRoles().subscribe(res => {
      this.roles = res
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
