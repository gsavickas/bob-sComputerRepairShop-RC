/**
 * Title: user-list.component.ts
 * Modified By: Larry
 * Date: 19 September 2021
 * Description: user list configuration
 */



import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteRecordDialogComponent } from './../../shared/delete-record-dialog/delete-record-dialog.component';
import { UserService } from './../../shared/user.service';
import { User } from './../../shared/user.interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
//Data table with its array of users objects
export class UserListComponent implements OnInit {
  users: User [];
  displayedColumns = ['userName', 'firstName', 'lastName', 'phoneNumber', 'address', 'email', 'functions'];

  //Calls the findAllUsers api and fills the user field with the users object
  constructor(private dialog: MatDialog, private userService: UserService) {
    this.userService.findAllUsers().subscribe(res => {
      this.users = res['data'];
      console.log(this.users);
    }, err => {
      console.log(err);
    });
   }

  ngOnInit(): void {
  }

  //Delete method that opens up the dialog of both the userId and recordId 
  delete(userId: string, recordId: string): void {
    const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {
      data: {
        recordId,
        dialogHeader: 'Delete Record Dialog',
        dialogBody: `Are you sure you want to delete user ${recordId}?`
      },
      disableClose: true,
      width: '800px'
    });
    dialogRef.afterClosed().subscribe(result => {
      //When confirmed it will  call the deleteUser service
      if (result === 'confirm') {
        this.userService.deleteUser(userId).subscribe(res => {
          console.log(`User delete`);
          this.users = this.users.filter(u => u._id !== userId);
        });
      }
    });
  }
}