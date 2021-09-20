/**
 * * Title: security-question-create.component.ts
 * Author: James Pinson 
 * Date: 09/19/21
 * Description: This is the component ts file for the security question create. 
 */

//These are the import statements required for this file. 
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityQuestionService } from 'src/app/shared/security-question.service';
import { SecurityQuestion } from 'src/app/shared/security-question.interface';

@Component({
  selector: 'app-security-question-create',
  templateUrl: './security-question-create.component.html',
  styleUrls: ['./security-question-create.component.css']
})

//Here we export the component to the rest of the application. 
export class SecurityQuestionCreateComponent implements OnInit {

  //We set out form variable using FormGroup. 
  form: FormGroup;

  //We implement the imports needed for these functions. 
  constructor(private fb: FormBuilder, private router: Router, private securityQuestionService: SecurityQuestionService) { 
  }

  ngOnInit(): void {
    //We create our form with one text field using a required validator. 
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])],
    });
  }

  //Here we create the create function which creates a new security question with a text field. 
  create(): void {
    const newSecurityQuestion = {} as SecurityQuestion;
    newSecurityQuestion.text = this.form.controls.text.value;

    //We call the security question service which allows us to use the create security question function which calls our api. 
    this.securityQuestionService.createSecurityQuestion(newSecurityQuestion).subscribe(res => {
      this.router.navigate(['/security-questions']);
      //If there is an error we log the error message. 
    }, err => {
      console.log(err);
    });
  }

  //This creates our cancel function which cancels the create security question form. 
  cancel(): void {
    this.router.navigate(['/security-questions']);
  }

}
