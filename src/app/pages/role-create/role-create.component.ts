/**
 * * Title: role-create.component.ts
 * Author: James Pinson 
 * Date: 10/3/21
 * Description: This is role-create component ts file. 
 */

//This is the import statements needed. 
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/api/message';
import { RoleService } from './../../shared/services/role.service';
import { Role } from './../../shared/models/role.interface';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.css']
})

//Here we export the RoleCreateComponent. 
export class RoleCreateComponent implements OnInit {
  //Here we create the form and errorMessages variables. 
  form: FormGroup;
  errorMessages: Message[];

  //We pass the imports we need for the functions through our constructor. 
  constructor(private fb: FormBuilder, private router: Router, private roleService: RoleService) {
   }

   //We create the role-create form with one text variable. 
  ngOnInit() {
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])]
    });
  }

  //This is the create function which creates the new role and redirects back to the role configuration page. 
  create() {
    const newRole = {
      text: this.form.controls['text'].value
    } as Role

    this.roleService.createRole(newRole).subscribe(res => {
      this.router.navigate(['/roles']);
      //If there is an error message we use this to display it to the user. 
    }, err => {
      console.log(err);
      this.errorMessages = [
        { severity: 'error', summary: 'Error', detail: err.message}
      ];
    })
  }

  //This is the cancel function which redirects the user back to the configuration page. 
  cancel() {
    this.router.navigate(['/roles']);
  }

}
