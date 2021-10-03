/**
 * * Title: base-layout.component.ts
 * Author: Larry Ohaka
 * Date: 08/18/21
 * Description: Navigation and Layout
 */

 import { Component, OnInit } from '@angular/core';
 import { Router } from '@angular/router';
 import { CookieService} from 'ngx-cookie-service';
 
 @Component({
   selector: 'app-base-layout',
   templateUrl: './base-layout.component.html',
   styleUrls: ['./base-layout.component.css']
 })
 export class BaseLayoutComponent implements OnInit {
 
   year: number = Date.now();
   isLoggedIn: boolean;
   name: String;
 
   //Cookie service, router
   constructor(private cookieService: CookieService, private router: Router) { 
     //isLoggedIn constructor ------> "? true : false" = if this returns something it will return true, otherwise it will return false
     this.isLoggedIn = this.cookieService.get('sessionuser')? true : false;

     // Debugging
     console.log("This is the new test " + sessionStorage.getItem('name'));

     this.name = sessionStorage.getItem('name');
     console.log('Signed in as a User' + this.name);
   }
 
   ngOnInit(): void {
   }
 
 
 //Signout
   signOut(){
     this.cookieService.deleteAll();
     //pushes you back to the signin page
     this.router.navigate(['/session/signin']);
   }
  }