import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {


  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }


  openModal(template: TemplateRef<any>) {
    this.modalService.open(template, { centered: true });
  }






}
