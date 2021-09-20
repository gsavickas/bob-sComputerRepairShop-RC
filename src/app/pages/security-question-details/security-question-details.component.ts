/**
 * * Title: security-question-details.component.ts
 * Author: James Pinson 
 * Date: 09/19/21
 * Description: This is the component ts file for the security question details. 
 */

//This is the import statements needed for this file. 
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { SecurityQuestionService } from 'src/app/shared/security-question.service';
import { SecurityQuestion } from 'src/app/shared/security-question.interface';

@Component({
  selector: 'app-security-question-details',
  templateUrl: './security-question-details.component.html',
  styleUrls: ['./security-question-details.component.css']
})

//Here we export this component to the rest of the application. 
export class SecurityQuestionDetailsComponent implements OnInit {

  //We set out question, questionId and form variables here. 
  question: SecurityQuestion;
  questionId: string;
  form: FormGroup;

  //We pass through the imports we need in our constructor. 
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private securityQuestionService: SecurityQuestionService) { 
    
    //We map the questionId to the questionId variable. 
    this.questionId = this.route.snapshot.paramMap.get('questionId');

    //We call the security question service to use the find security question by id function. 
    this.securityQuestionService.findSecurityQuestionById(this.questionId).subscribe(res => {
      //It returns the data for this security question. 
      this.question = res['data'];
      //If there is an error we log it here. 
    }, err => {
      console.log(err);
      //On completion we set the value to question text. 
    }, () => {
      this.form.controls.text.setValue(this.question.text);
    })
  }

  ngOnInit(): void {
    //We create our form using form group which consist of a text field. 
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])],
    });
  }

  //Here we create our save question function which will save our updated security question. 
  saveQuestion(): void {
    const updatedSecurityQuestion: SecurityQuestion = {
      text: this.form.controls.text.value
    };

    this.securityQuestionService.updateSecurityQuestion(this.questionId, updatedSecurityQuestion).subscribe(res => {
      this.router.navigate(['/security-questions'])
    });
  }

  //Here we create the cancel function to allow users to cancel the update. 
  cancel(): void {
    this.router.navigate(['/security-questions']);
  }

}
