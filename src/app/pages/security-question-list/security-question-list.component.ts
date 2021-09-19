/**
 * * Title: security-question-list.component.ts
 * Author: Larry
 * Date: 09/19/21
 * Description: Security question list angular code
 */


import { Component, OnInit } from '@angular/core';
import { SecurityQuestionService } from './../../shared/security-question.service';
import { SecurityQuestion } from './../../shared/security-question.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-security-question-list',
  templateUrl: './security-question-list.component.html',
  styleUrls: ['./security-question-list.component.css']
})
export class SecurityQuestionListComponent implements OnInit {
  form: FormGroup;

  securityQuestion: SecurityQuestion[];
  displayColumns = ['question', 'functions'];

  //form builder constructor
  constructor( private fb: FormBuilder, private router: Router, private securityQuestionService: SecurityQuestionService) {
        }
      
//form group with one field called text
  ngOnInit(): void {
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])],
    });
  }

//Create function
create(): void {
  const newSecurityQuestion: SecurityQuestion = {
    text: this.form.controls.text.value
  }
  //calls the create question api
  this.securityQuestionService.createSecurityQuestion(newSecurityQuestion).subscribe(res => {
    this.router.navigate(['/security-questions']);
  },err => {
    console.log(err);
  });
}
//redirects back to the security questions list
cancel(): void {
  this.router.navigate(['/security-questions']);
}
}