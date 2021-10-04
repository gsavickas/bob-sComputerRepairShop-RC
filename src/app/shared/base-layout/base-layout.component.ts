/**
 * * Title: base-layout.component.ts
 * Author: Larry Ohaka
 * Date: 08/18/21
 * Description: Navigation and Layout
 */

 import { Component, OnInit } from '@angular/core';
 import { Router } from '@angular/router';
 import { CookieService} from 'ngx-cookie-service';
 import { Role } from '../models/role.interface'
 import { RoleService } from '../services/role.service';
 
 @Component({
   selector: 'app-base-layout',
   templateUrl: './base-layout.component.html',
   styleUrls: ['./base-layout.component.css']
 })
 export class BaseLayoutComponent implements OnInit {
 userRole: Role
 
   //Cookie service, router
   constructor(private cookieService: CookieService, private router: Router, private roleService: RoleService) { 
     this.roleService.findUserRole(this.cookieService.get('sessionuser')).subscribe(res =>{
       this.userRole = res['data'];
     })
   }
 
   ngOnInit(){
   }
 
 
 //Signout
   signout(){
     this.cookieService.deleteAll();
     //pushes you back to the signin page
     this.router.navigate(['/session/signin']);
   }
  }