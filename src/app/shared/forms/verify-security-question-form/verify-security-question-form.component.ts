/**
 * * Title: verify-security-question-form.component.ts
 * Author: Larry Ohaka
 * Date: 09/23/21
 * Description: Navigation and Layout
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng/api/message';

@Component({
  selector: 'app-verify-security-question-form',
  templateUrl: './verify-security-question-form.component.html',
  styleUrls: ['./verify-security-question-form.component.css']
})
export class VerifySecurityQuestionFormComponent implements OnInit {
  selectedSecurityQuestions: any;
  question1: string;
  question2: string;
  question3: string;
 username: string;
  form: FormGroup;
  errorMessages: Message[];

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private fb: FormBuilder,) { 
this.username = this.route.snapshot.queryParamMap.get('username');//The username call will be used to get the value being passed over from the typescript code 
console.log(this.username);
  
//Makes call to findSecurityQuestions Api
  this.http.get('/api/users/' + this.username + '/security-questions').subscribe(res =>{
    this.selectedSecurityQuestions = res['data'];
    console.log(this.selectedSecurityQuestions);
    console.log(res);
  },err => {
    console.log(err);
  }, () =>{
    //These are populated with the selectedSecurityQuestions
    this.question1 = this.selectedSecurityQuestions[0].questionText;
    this.question2 = this.selectedSecurityQuestions[1].questionText;
    this.question3 = this.selectedSecurityQuestions[2].questionText;

    console.log(this.question1);
    console.log(this.question2);
    console.log(this.question3);
  });
}

//This initialization has the form with the questions created
  ngOnInit() {
    this.form = this.fb.group({
      answerToSecurityQuestion1: [null, Validators.compose([Validators.required])],
      answerToSecurityQuestion2: [null, Validators.compose([Validators.required])],
      answerToSecurityQuestion3: [null, Validators.compose([Validators.required])]
    });
  }
//this value gets the values that were entered
  verifySecurityQuestions() {
    const answerToSecurityQuestion1 = this.form.controls['answerToSecurityQuestion1'].value;
    const answerToSecurityQuestion2 = this.form.controls['answerToSecurityQuestion2'].value;
    const answerToSecurityQuestion3 = this.form.controls['answerToSecurityQuestion3'].value;
//logs the security question value
    console.log(answerToSecurityQuestion1);
    console.log(answerToSecurityQuestion2);
    console.log(answerToSecurityQuestion3);

//Makes call to the Verify security questions api and posts questions and answers
    this.http.post('/api/session/verify/users/' + this.username + '/security-questions', {
      questionText1: this.question1,
      questionText2: this.question2,
      questionText3: this.question3,
      answerText1: answerToSecurityQuestion1,
      answerText2: answerToSecurityQuestion2,
      answerText3: answerToSecurityQuestion3
    }).subscribe(res => {
      console.log(res);
      //Invalid user handler
      if (res ['message'] === 'success') {
        this.router.navigate(['/session/reset-password'], {queryParams: {isAuthenticated: 'true', username: this.username}, skipLocationChange: true});
      } else {
        //this.errorMessage = 'Unable to verify security questions, please try again.';
        this.errorMessages = [
          {severity: 'error', summary: 'Error', detail: 'Unable to verify security question answers'}
        ]
        console.log('Unable to verify security answers')
      }
    });
  }
}
