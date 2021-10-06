/**
 * * Title: user-details.component.ts
 * Author: James Pinson 
 * Date: 09/19/21
 * Description: This is the component ts file for the user details. 
 */

//This is the import statements needed for this file. 
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from './../../shared/user.service';
import { User } from './../../shared/user.interface';
import { Role } from './../../shared/models/role.interface';
import { RoleService } from 'src/app/shared/services/role.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})

//Here we export the user details component. 
export class UserDetailsComponent implements OnInit {

  //Here we create the variables we need. 
  user: User;
  userId: string;
  form: FormGroup;
  roles: Role[];

  //Here we pass through the imports we need for these functions. 
  constructor(private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private router: Router, private userService: UserService, private roleService: RoleService) {

    //Here we map the parameter userId to this variable. 
    this.userId = this.route.snapshot.paramMap.get('userId');

    console.log(this.userId);

    //Here we call our user service to call our findUserById function. 
    this.userService.findUserById(this.userId).subscribe(res => {
      //Here we return the user data. 
      this.user = res['data'];
      //If there is an error we log it here. 
    }, err => {
      console.log(err);
      //On completion we return the values for these fields. 
    }, () => {
      this.form.controls.firstName.setValue(this.user.firstName);
      this.form.controls.lastName.setValue(this.user.lastName);
      this.form.controls.phoneNumber.setValue(this.user.phoneNumber);
      this.form.controls.address.setValue(this.user.address);
      this.form.controls.email.setValue(this.user.email);
      this.form.controls.role.setValue(this.user.role['role']);

      console.log(this.user);

      this.roleService.findAllRoles().subscribe(res => {
        this.roles = res.data;
      })
    });
   }

  ngOnInit(): void {
    //This is our form which contains our required fields. 
    this.form = this.fb.group({
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      phoneNumber:[null, Validators.compose([Validators.required])],
      address: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      role: [null, Validators.compose([Validators.required])]
    });
  }

  //This is our save user function which saves the inputted values. 
  saveUser(): void {
    const updatedUser: User = {
      firstName: this.form.controls.firstName.value, 
      lastName: this.form.controls.lastName.value, 
      phoneNumber: this.form.controls.phoneNumber.value,
      address: this.form.controls.address.value,
      email: this.form.controls.email.value,
      role: this.form.controls.role.value
    };

    //This calls our updateUser function from our user service to update the user.
    this.userService.updateUser(this.userId, updatedUser).subscribe(res => {
      //This returns the user to the users page. 
      this.router.navigate(['/users']);
      //If there is an error we log it here. 
    }, err => {
      console.log(err);
    });
  }

  //This is our cancel function which allows the user to cancel out of the update form. 
  cancel(): void {
    this.router.navigate(['/users']);
  }

}
