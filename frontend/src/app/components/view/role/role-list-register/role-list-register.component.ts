import { RoleService } from './../../../../services/role.service';
import { Role } from './../../../../models/roleModel';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-role-list-register',
  templateUrl: './role-list-register.component.html',
  styleUrls: ['./role-list-register.component.css']
})
export class RoleListRegisterComponent implements OnInit {
  idRoute: any

  tituloModal: string = ''
  mensagemModal: string = ''
  valuePB = 0

  tituloPage: string = 'New role'
  tituloButton: string = 'Register'

  clicked = false;

  roleEmployee: Role = {
    roleName: '',
    roleDepartment: '',
    roleAssignment: ''
  }

  constructor(private roleService: RoleService, private router: Router, private actRoute: ActivatedRoute, private modalService: NgbModal) {
    this.idRoute = this.actRoute.snapshot.params['id']
  }

  ngOnInit(): void {
    console.log("TO NO REGISTER");
    if (this.idRoute != undefined) {
      this.tituloPage = 'Edit role'
      this.tituloButton = 'Edit'
      this.initForm()
    }

  }

  initForm() {
    this.roleService.findOneRole(this.idRoute).subscribe(res => {
      this.roleEmployee = res
      console.log(res);

    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalService.open(template, { centered: true });
    this.router.navigate([`/roles`])

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
    this.roleService.insertRole(this.roleEmployee).subscribe({
      next: () => {
        this.tituloModal = `Success!!!`
        this.mensagemModal = `New role registered!`
        console.log(this.roleEmployee);

        this.openModal(template)
      },
      error: erro => {
        this.tituloModal = `Failed.`
        this.mensagemModal = `Failed to register a new role.`
        console.log(this.roleEmployee);

        this.openModal(template)
      },
      complete: () => {
        console.info('Complete')
      }
    })
  }


  edit(template: TemplateRef<any>) {
    this.roleService.editRole(this.idRoute, this.roleEmployee).subscribe({
      next: () => {
        this.tituloModal = `Success!!!`
        this.mensagemModal = `Role #${this.idRoute} edited!`
        this.openModal(template)
      },
      error: erro => {
        this.tituloModal = `Failed.`
        this.mensagemModal = `Failed to edit role #${this.idRoute}.`
        this.openModal(template)
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
