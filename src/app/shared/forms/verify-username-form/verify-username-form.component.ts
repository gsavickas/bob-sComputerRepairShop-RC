/**
 * * Title: verify-username-for.component.ts
 * Author: Larry Ohaka
 * Date: 09/23/21
 * Description: Navigation and Layout
 */


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Message } from 'primeng/api/message';

@Component({
  selector: 'app-verify-username-form',
  templateUrl: './verify-username-form.component.html',
  styleUrls: ['./verify-username-form.component.css']
})
export class VerifyUsernameFormComponent implements OnInit {
  form: FormGroup;
  errorMessage: Message[];

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) { }
//Username form
  ngOnInit(): void {
    this.form= this.fb.group({
      username: [null, Validators.compose([Validators.required])]
    });
  }
//when clicked this calls the verified security questions
  validateUsername() {
    //Receives username from the form
    const username = this.form.controls['username'].value;
    //calls api
    this.http.get('/api/session/verify/users/' + username).subscribe(res =>{
      console.log(res);
      //redirects to the next route
      this.router.navigate(['/session/verify-security-questions'], {queryParams: {username: username}, skipLocationChange: true});//skipLocationCHange doesn't change the url. Also allows you to send data to  a new component 
    }, err =>{
      this.errorMessages = [
        {severity: 'error', summary: 'Error', detail: err['message']}
      ]
    console.log(err);
    });
  }

}
