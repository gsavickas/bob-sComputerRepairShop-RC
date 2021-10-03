/**
 * * Title: role-details.component.ts
 * Author: James Pinson 
 * Date: 09/19/21
 * Description: This is the component ts file for the role-details page. 
 */

//This is the import statements. 
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from './../../shared/services/role.service';
import { Role } from './../../shared/models/role.interface';

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.css']
})

//This exports the RoleDetailsComponent to the rest of the application. 
export class RoleDetailsComponent implements OnInit {

  //Here we have our variables for form, role, and roleId. 
  form: FormGroup;
  role: Role
  roleId: string;

  //We pass the imports we will use through our constructor. 
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private roleService: RoleService) {
    //We set the roleId variable to the roleId of the user. 
    this.roleId = this.route.snapshot.paramMap.get('roleId');

    //We use the findRoleById to return the role for our details page. 
    this.roleService.findRoleById(this.roleId).subscribe(res => {
      this.role = res['data'];
    }, err => {
      //If there is an error we log it. 
      console.log(err);
    }, () => {
      //We set the value of the form to the current role. 
      this.form.controls['text'].setValue(this.role.text);
    })
   }

  ngOnInit() {
    //This creates our form with one text variable. 
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])]
    });
  }

  //This is the save function which saves the updated role. 
  save() {
    const updateRole = {
      text: this.form.controls['text'].value
    } as Role;

    //This calls our updateRole function which updated the role and returns the user to the role configuration page. 
    this.roleService.updateRole(this.roleId, updateRole).subscribe(res => {
      this.router.navigate(['/roles']);
    }, err => {
      //If there is an error we log it. 
      console.log(err);
    })
  }

  //This is the cancel function which redirects the user to the role configuration page. 
  cancel() {
    this.router.navigate(['/roles']);
  }
}
