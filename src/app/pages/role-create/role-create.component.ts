import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { RoleService } from './../../shared/services/role.service';
import { Role } from './../../shared/models/role.interface';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.css']
})
export class RoleCreateComponent implements OnInit {
  form: FormGroup;
  errorMessages: Message[];

  constructor(private fb: FormBuilder, private router: Router, private roleService: RoleService) {
   }

  ngOnInit() {
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])]
    });
  }

  create() {
    const newRole = {
      text: this.form.controls['text'].value
    } as Role

    this.roleService.createRole(newRole).subscribe(res => {
      this.router.navigate(['/roles']);
    }, err => {
      this.errorMessages = [
        { severity: 'error', summary: 'Error', detail: err.message}
      ];
    })
  }

  cancel() {
    this.router.navigate(['/roles']);
  }

}
