import { Role } from './../../../../models/roleModel';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-role-list-all',
  templateUrl: './role-list-all.component.html',
  styleUrls: ['./role-list-all.component.css']
})
export class RoleListAllComponent implements OnInit {
  roles: Role[] = [];

  roleName: string = ''
  roleId: any


  titleModal: string = ''
  messageModal: string = ''



  constructor(
    private roleService: RoleService,
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
    this.roleService.findAllRoles().subscribe((res) => {
      console.log(res);
      this.roles = res;
    });
  }

  ////////// soft delete team
  deleteRole(template: TemplateRef<any>) {
    this.roleService.deleteRole(this.roleId).subscribe({
      next: () => {
      },
      error: erro => {
        this.titleModal = "NOT deleted!"
        this.messageModal = `Role ${this.roleName} NOT deleted.`
        this.onlyOpenModal(template)

      },
      complete: () => {
        console.info('Complete')
        this.titleModal = "Role deleted!"
        this.messageModal = `Role ${this.roleName} successfully deleted.`
        this.onlyOpenModal(template)
      }

    })
  }


  ///////// open modal and pass team
  openModal(template: TemplateRef<any>, role: Role) {
    this.modalService.open(template, { centered: true });
    this.roleName = role.roleName
    this.roleId = role.idRole
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
