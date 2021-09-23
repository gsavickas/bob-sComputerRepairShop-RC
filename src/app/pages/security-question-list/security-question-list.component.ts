/**
 * * Title: security-question-list.component.ts
 * Author: Larry
 * Date: 09/19/21
 * Description: Security question list angular code
 */


import { Component, OnInit } from '@angular/core';
import { SecurityQuestionService } from './../../shared/security-question.service';
import { SecurityQuestion } from './../../shared/security-question.interface';
import { DeleteRecordDialogComponent } from './../../shared/delete-record-dialog/delete-record-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-security-question-list',
  templateUrl: './security-question-list.component.html',
  styleUrls: ['./security-question-list.component.css']
})
export class SecurityQuestionListComponent implements OnInit {
  

  securityQuestions: SecurityQuestion[];
  displayedColumns= ['question', 'functions'];

  //form builder constructor
  constructor(private dialog: MatDialog, private securityQuestionService: SecurityQuestionService) {
    this.securityQuestionService.findAllSecurityQuestions().subscribe(res => {
      this.securityQuestions = res['data'];
    }, err  => {
      console.log(err);
        });
      }
      ngOnInit(): void{

      }
// WHen deleting the dialog box opens to pass over the record Id the display the messages confirming 
      delete(recordId: string): void{
        const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {
          data: {
            recordId,
            dialogHeader: 'Delete Record Dialog',
            dialogBody: `Are you sure you want to delete the selected security question?`
          },
          disableClose: true,
          width: '800px'
        });
//After they confirmed deleting by closing this calls the securityQuestionService

        dialogRef.afterClosed().subscribe(result =>{
          if (result === 'confirm') {
            this.securityQuestionService.deleteSecurityQuestion(recordId).subscribe(res =>{
              console.log('Security question deleted');
              this.securityQuestions = this.securityQuestions.filter(q => q._id !== recordId);
            });
          }
        });
      }
    }
