/**
 * * Title: role-list.component.ts
 * Author: James Pinson
 * Date: 09/30/21
 * Description: This is the role list component ts file for the role list page. 
 */

//Here we have all the import statements for what we need for this file. 
import { Component, OnInit } from '@angular/core';
import { DeleteRecordDialogComponent } from './../../shared/delete-record-dialog/delete-record-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Role } from './../../shared/models/role.interface';
import { RoleService } from './../../shared/services/role.service';
import { Message } from 'primeng/api';


@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})

//Here we export the RoleListComponent. 
export class RoleListComponent implements OnInit {

  //Here we set the variables for roles and errorMessages.
  roles: Role[];
  errorMessages: Message[];

  //Here we pass the modules we need through the constructor. 
  constructor(private roleService: RoleService, private dialog: MatDialog) {
    //We call the roleService and the findAllRoles function.  
    this.roleService.findAllRoles().subscribe(res => {
      //We return the role data and log the information. 
      this.roles = res.data;
      console.log(this.roles);
    })
  }

  ngOnInit(): void {
  }

  //Here we create the delete function. 
  delete(roleId, text) {
    //This opens a dialog box containing the deleteRecordDialogComponent. 
    const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {
      //Here we have the data we want to display with the header and body message. 
      data: {
        roleId,
        dialogHeader: 'Delete Record Dialog',
        dialogBody: `Are you sure you want to delete role: ${text}?`
      },
      //We disable close by clicking out of the box. 
      disableClose: true,
      width: '800px'
    });

    //Here we have the dialogRef afterClosed function. 
    dialogRef.afterClosed().subscribe(result => {
      //If the delete is confirmed we return the results. 
      if (result === 'confirm') {
        //We call the roleService and the deleteRole functions. 
        this.roleService.deleteRole(roleId).subscribe(res => {
          console.log('Role deleted')
          this.roles = this.roles.filter(role => role._id !== roleId);
          //If there is an error we log the error mix --Need to Fix. 
        }, err => {
          this.errorMessages = [
            { severity: 'error', summary: 'Error', detail: err.message}
          ];
        })
      }
    });
  }

}
