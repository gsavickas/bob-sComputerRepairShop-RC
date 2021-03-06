/**
 * * Title: reset-password-form.component.ts
 * Author: Larry Ohaka
 * Date: 09/23/21
 * Description: Navigation and Layout
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.css']
})
export class ResetPasswordFormComponent implements OnInit {
  isAuthenticated: string;
  username: string;
  form: FormGroup;

// The authentication and username values are passed over
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private  cookieService: CookieService) {
    this.isAuthenticated = this.route.snapshot.queryParamMap.get('isAuthenticated');
    this.username = this.route.snapshot.queryParamMap.get('username');
   }

   //This initialization creates a form for the password
  ngOnInit() {
    this.form = this.fb.group({
      password: [null, Validators.compose([Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')])]
    });
  }

//this reset the password
  resetPassword(){
    this.http.post('/api/session/users/' + this.username + '/reset-password', {
      password: this.form.controls['password'].value
    }).subscribe(res => {
      /**
       * 
       * User is authenticated and we can grant them access
       */
      this.cookieService.set('sessionuser', this.username, 1);
      this.router.navigate(['/']);
    }, err => {
      console.log(err)
    })
  }
}
