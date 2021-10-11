/**
 * * Title: signin.component.ts
 * Author: Grayton Savickas
 * Date: 09/21/21
 * Description: Signin page
 */

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  form: FormGroup;
  errorMessage: string;

  constructor(private router: Router, private cookieService: CookieService, private fb: FormBuilder, private http: HttpClient) { 
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      userName: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')])],
    });
  }

  // compares provided username and password with databases entries for the signed in user
  signin(): void {
    const userName = this.form.controls.userName.value;
    const password = this.form.controls.password.value;

    this.http.post('/api/session/signin',{
      userName,
      password
    }).subscribe(res =>{
      console.log(res['data']);
      if (res['data'].userName  && !(res['data'].isDisabled))
      {
      /**
       * Once this far the user will be authenticated and gain access to the site
       */
        sessionStorage.setItem('name',`${res['data'].firstName}`)
        this.cookieService.set('sessionuser', res['data'].userName, 1);
        this.router.navigate(['/']);
      }
    }, err => {
      console.log(err);
      this.errorMessage = err.error.message;
    });
  }
}

