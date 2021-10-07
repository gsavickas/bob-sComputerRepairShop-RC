/**
 * * Title: role.guard.ts
 * Author: Grayton Savickas
 * Date: 10/6/21
 * Description: role guard that prevent users other than ones with the admin role.
 */

import { RoleService } from './services/role.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router, private cookieService: CookieService, private roleService: RoleService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.roleService.findUserRole(this.cookieService.get('sessionuser')).pipe(map(res =>{
      console.log(res);
     
      // check to see if the user has the admin role
      if(res['data'].role === 'admin'){
        // if true the guard allows the re-route to protected pages
        return true;
        // else the router will navigate to the home page
      } else {
        this.router.navigate(['/']);
        return false;
      }
    }))
  }
}
  
