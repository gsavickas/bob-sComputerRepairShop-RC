/**
 * * Title: register.component.ts
 * Author: James Pinson 
 * Date: 09/19/21
 * Description: This is the component ts file for the registration process. . 
 */

//Here we have the import statements for the file. 
import { Component, OnInit } from '@angular/core';
import { SecurityQuestionService } from 'src/app/shared/security-question.service';
import { SecurityQuestion } from 'src/app/shared/security-question.interface';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { Message } from 'primeng/api/message';

//We added the stepper global options for the alerts in the providers. 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})

//Here we export the register component. 
export class RegisterComponent implements OnInit {
  //Here we create our security questions variable with the SecurityQuestions array. 
  securityQuestions: SecurityQuestion[];

  //Here we create our form variables set to the form group type. 
  contactForm: FormGroup;
  securityQuestionsForm: FormGroup;
  credentialsForm: FormGroup;

  //Here we set the error messages to message. 
  errorMessages: Message[];

  //Here we have the constructor were we pass in the imports we will use. 
  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder, private cookieService: CookieService, private securityQuestionsService: SecurityQuestionService) { 

    //We call the find all security questions function and return the data. 
    this.securityQuestionsService.findAllSecurityQuestions().subscribe(res => {
      this.securityQuestions = res['data']
    }, err => {
      console.log(err);
    })
  }

  ngOnInit()  {
    //We create the fields for the contact form with validation. 
    this.contactForm = this.fb.group({
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      phoneNumber: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      address: [null, Validators.compose([Validators.required])]
    });

    //We create the fields for the security questions form with validation. 
    this.securityQuestionsForm = this.fb.group({
      securityQuestion1: [null, Validators.compose([Validators.required])],
      securityQuestion2: [null, Validators.compose([Validators.required])],
      securityQuestion3: [null, Validators.compose([Validators.required])],
      answerToSecurityQuestion1: [null, Validators.compose([Validators.required])],
      answerToSecurityQuestion2: [null, Validators.compose([Validators.required])],
      answerToSecurityQuestion3: [null, Validators.compose([Validators.required])],
    });

    //We create the fields for the credentials form with validation. 
    this.credentialsForm = this.fb.group({
      userName: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')])],
    });
  }

  //We create the register function. 
  register() {
    //We set variables and link them to the values provided. 
    const contactInformation = this.contactForm.value;
    const securityQuestions = this.securityQuestionsForm.value;
    const credentials = this.credentialsForm.value;

    //We create the selectedSecurityQuestions array. 
    const selectedSecurityQuestions = [
      {
        questionText: securityQuestions.securityQuestion1,
        answerText: securityQuestions.answerToSecurityQuestion1
      },
      {
        questionText: securityQuestions.securityQuestion2,
        answerText: securityQuestions.answerToSecurityQuestion2,
      },
      {
        questionText: securityQuestions.securityQuestion3,
        answerText: securityQuestions.answerToSecurityQuestion3
      }
    ];

    //We return the array to our console. 
    console.log(selectedSecurityQuestions);

    //We use a post request to create our new user. 
    this.http.post('/api/session/register', {
      userName: credentials.userName,
      password: credentials.password,
      firstName: contactInformation.firstName,
      lastName: contactInformation.lastName,
      phoneNumber: contactInformation.phoneNumber,
      address: contactInformation.address,
      email: contactInformation.email,
      selectedSecurityQuestions: selectedSecurityQuestions
    }).subscribe(res => {
      //This logs the new user in as a sessionuser. 
      this.cookieService.set('sessionuser', credentials.userName, 1);
      this.router.navigate(['/']);
    }, err => {
      //This returns any error message we may have. 
      this.errorMessages = [
        { severity: 'error', summary: 'Error', detail: err.message }
      ]
      //This logs the error message to our console. 
      console.log(`Node.js server error; httpCode: ${err.httpCode};message:${err.message}`)
      console.log(err);
    });
  }

}
